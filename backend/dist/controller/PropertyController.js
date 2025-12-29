"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.getOwnerProperties = exports.addProperty = void 0;
const Property_1 = require("../model/Property");
const PropertyPhoto_1 = require("../model/PropertyPhoto");
const database_1 = require("../config/database");
const addProperty = async (req, res) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        const { title, description, rent, location, amenities, photos } = req.body;
        const owner_id = req.user?.id;
        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }
        if (!title || !rent || !location) {
            res
                .status(400)
                .json({ message: "Title, rent, and location are required." });
            return;
        }
        // Create Property
        const newProperty = await Property_1.Property.create({
            title,
            description,
            rent,
            location,
            amenities,
            owner_id,
            isActive: true,
        }, { transaction });
        // Add Photos if provided
        if (photos && Array.isArray(photos) && photos.length > 0) {
            const photoEntries = photos.map((url) => ({
                photoUrl: url,
                property_id: newProperty.id,
            }));
            await PropertyPhoto_1.PropertyPhoto.bulkCreate(photoEntries, { transaction });
        }
        await transaction.commit();
        res.status(201).json({
            message: "Property created successfully",
            propertyId: newProperty.id,
        });
    }
    catch (error) {
        await transaction.rollback();
        console.error("Add Property Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.addProperty = addProperty;
const getOwnerProperties = async (req, res) => {
    try {
        const owner_id = req.user?.id;
        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }
        const properties = await Property_1.Property.findAll({
            where: { owner_id },
            include: [{ model: PropertyPhoto_1.PropertyPhoto }], // Assuming association is set up to auto-fetch photos
        });
        res.json({
            message: "Properties fetched successfully",
            properties,
        });
    }
    catch (error) {
        console.error("Get Owner Properties Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.getOwnerProperties = getOwnerProperties;
const updateProperty = async (req, res) => {
    try {
        const idParam = req.params.id;
        const propertyId = parseInt(idParam, 10);
        if (Number.isNaN(propertyId)) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        const owner_id = req.user?.id;
        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }
        const property = await Property_1.Property.findByPk(propertyId);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        if (property.owner_id !== owner_id) {
            res.status(403).json({ message: "Access Denied. Not the owner." });
            return;
        }
        const allowedFields = [
            "title",
            "description",
            "rent",
            "location",
            "amenities",
            "isActive",
        ];
        const payload = {};
        for (const key of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                payload[key] = req.body[key];
            }
        }
        await property.update(payload);
        res.json({
            message: "Property updated successfully",
            property,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.updateProperty = updateProperty;
const deleteProperty = async (req, res) => {
    try {
        const idParam = req.params.id;
        const propertyId = parseInt(idParam, 10);
        if (Number.isNaN(propertyId)) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        const owner_id = req.user?.id;
        if (!owner_id) {
            res.status(401).json({ message: "Unauthorized. User ID missing." });
            return;
        }
        const property = await Property_1.Property.findByPk(propertyId);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        if (property.owner_id !== owner_id) {
            res.status(403).json({ message: "Access Denied. Not the owner." });
            return;
        }
        await property.update({ isActive: false });
        res.json({
            message: "Property soft-deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
exports.deleteProperty = deleteProperty;
