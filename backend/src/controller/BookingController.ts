import { Request, Response } from "express";
import { Op } from "sequelize";
import { sequelize } from "../config/database";
import { Booking } from "../model/Booking";
import { Property } from "../model/Property";
import { User } from "../model/User";

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const tenant_id = req.user?.id;
        const propertyIdStr = req.params.propertyId;
        const property_id = parseInt(propertyIdStr, 10);

        if (!tenant_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }

        if (Number.isNaN(property_id)) {
            res.status(400).json({ message: "Invalid property ID" });
            return;
        }

        // 1. Check if property exists and is active
        const property = await Property.findOne({ where: { id: property_id, isActive: true } });
        if (!property) {
            res.status(404).json({ message: "Property not found or inactive" });
            return;
        }

        // 2. Check for existing booking by this tenant
        const existingBooking = await Booking.findOne({
            where: {
                property_id,
                tenant_id,
            },
        });

        if (existingBooking) {
            res.status(400).json({ message: "You have already requested to book this property." });
            return;
        }

        // 3. Create Booking
        const newBooking = await Booking.create({
            property_id,
            tenant_id,
            status: "Pending",
        });

        res.status(201).json({
            message: "Booking requested successfully",
            bookingId: newBooking.id,
            status: "Pending",
        });
    } catch (error) {
        console.error("Create Booking Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getTenantBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const tenant_id = req.user?.id;

        if (!tenant_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }

        const bookings = await Booking.findAll({
            where: { tenant_id },
            include: [{ model: Property, attributes: ["id", "title", "location", "rent"] }], // Fetch related property details
            order: [["createdAt", "DESC"]]
        });

        res.json({
            message: "Bookings fetched successfully",
            bookings,
        });
    } catch (error) {
        console.error("Get Tenant Bookings Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getBookingRequests = async (req: Request, res: Response): Promise<void> => {
    try {
        const owner_id = req.user?.id;
        const propertyIdStr = req.params.propertyId;
        const property_id = parseInt(propertyIdStr, 10);

        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }

        if (Number.isNaN(property_id)) {
            res.status(400).json({ message: "Invalid property ID" });
            return;
        }

        // 1. Verify Property Ownership
        const property = await Property.findByPk(property_id);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }

        if (property.owner_id !== owner_id) {
            res.status(403).json({ message: "Access Denied. You are not the owner of this property." });
            return;
        }

        // 2. Fetch Bookings for Property
        const bookings = await Booking.findAll({
            where: { property_id },
            include: [
                {
                    model: User,
                    as: "tenant",
                    attributes: ["id", "name", "email", "contact"]
                }
            ],
            order: [["createdAt", "ASC"]] // First come, first served
        });

        res.json({
            message: "Booking requests fetched successfully",
            bookings,
        });

    } catch (error) {
        console.error("Get Booking Requests Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    const transaction = await sequelize.transaction();
    try {
        const owner_id = req.user?.id;
        const bookingIdStr = req.params.bookingId;
        const booking_id = parseInt(bookingIdStr, 10);
        const { status } = req.body || {};

        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            await transaction.rollback();
            return;
        }

        if (Number.isNaN(booking_id)) {
            res.status(400).json({ message: "Invalid booking ID" });
            await transaction.rollback();
            return;
        }

        if (status !== "Approved" && status !== "Rejected") {
            res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
            await transaction.rollback();
            return;
        }

        // 1. Find Booking
        const booking = await Booking.findByPk(booking_id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            await transaction.rollback();
            return;
        }

        // 2. Find Property to check ownership
        const property = await Property.findByPk(booking.property_id);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            await transaction.rollback();
            return;
        }

        // 3. Ownership Check
        if (property.owner_id !== owner_id) {
            res.status(403).json({ message: "Access Denied. You are not the owner." });
            await transaction.rollback();
            return;
        }

        // 4. Check if already processed
        if (booking.status === "Approved") {
            res.status(400).json({ message: "Booking is already approved." });
            await transaction.rollback();
            return;
        }

        // 5. Handle Logic
        if (status === "Rejected") {
            // Simple rejection
            await booking.update({ status: "Rejected" }, { transaction });
            await transaction.commit();
            res.json({ message: "Booking rejected successfully", booking });
        } else {
            // Approval Logic (Complex)

            // a. Approve this booking
            await booking.update({ status: "Approved" }, { transaction });

            // b. Reject all OTHER pending bookings for this property
            await Booking.update(
                { status: "Rejected" },
                {
                    where: {
                        property_id: property.id,
                        id: { [Op.ne]: booking_id }, // Not this booking
                        status: "Pending"
                    },
                    transaction
                }
            );

            // c. Deactivate property
            await property.update({ isActive: false }, { transaction });

            await transaction.commit();
            res.json({
                message: "Booking approved. Property is now inactive and other requests rejected.",
                booking
            });
        }

    } catch (error) {
        await transaction.rollback();
        console.error("Update Booking Status Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
