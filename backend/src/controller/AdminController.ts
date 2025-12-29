import { Request, Response } from "express";
import { User } from "../model/User";
import { Property } from "../model/Property";
import { Booking } from "../model/Booking";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role", "contact", "createdAt"], // Exclude sensitive data like password
            order: [["createdAt", "DESC"]]
        });

        res.json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await Property.findAll({
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["id", "name", "email", "contact"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json({
            message: "Properties fetched successfully",
            properties
        });
    } catch (error) {
        console.error("Get All Properties Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: User,
                    as: "tenant",
                    attributes: ["id", "name", "email", "contact"]
                },
                {
                    model: Property,
                    attributes: ["id", "title", "location"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json({
            message: "Bookings fetched successfully",
            bookings
        });
    } catch (error) {
        console.error("Get All Bookings Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const updatePropertyStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const propertyIdStr = req.params.id;
        const property_id = parseInt(propertyIdStr, 10);
        const { isActive } = req.body;

        if (Number.isNaN(property_id)) {
            res.status(400).json({ message: "Invalid property ID" });
            return;
        }

        if (typeof isActive !== 'boolean') {
            res.status(400).json({ message: "Invalid status. isActive must be a boolean." });
            return;
        }

        const property = await Property.findByPk(property_id);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }

        await property.update({ isActive });

        res.json({
            message: `Property ${isActive ? 'activated' : 'deactivated'} successfully`,
            property
        });

    } catch (error) {
        console.error("Update Property Status Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
