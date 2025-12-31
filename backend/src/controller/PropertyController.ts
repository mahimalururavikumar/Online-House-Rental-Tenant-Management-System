import { Request, Response } from "express";
import { Op } from "sequelize";
import { Property } from "../model/Property";
import { PropertyPhoto } from "../model/PropertyPhoto";
import { sequelize } from "../config/database";

export const addProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { title, description, rent, location, amenities, photos } = req.body;
    const owner_id = req.user?.id;

    if (!owner_id) {
      res.status(401).json({ message: "Unauthorized. User ID missing." });
      return;
    }

    if (!title || rent === undefined || !location) {
      res
        .status(400)
        .json({ message: "Title, rent, and location are required." });
      return;
    }

    if (rent <= 0) {
      res.status(400).json({ message: "Rent amount must be greater than zero." });
      return;
    }

    // Create Property
    const newProperty = await Property.create(
      {
        title,
        description,
        rent,
        location,
        amenities,
        owner_id,
        isActive: true,
      },
      { transaction }
    );

    // Add Photos if provided
    if (photos && Array.isArray(photos) && photos.length > 0) {
      const photoEntries = photos.map((url: string) => ({
        photoUrl: url,
        property_id: newProperty.id,
      }));
      await PropertyPhoto.bulkCreate(photoEntries, { transaction });
    }

    await transaction.commit();

    res.status(201).json({
      message: "Property created successfully",
      propertyId: newProperty.id,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Add Property Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getOwnerProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const owner_id = req.user?.id;

    if (!owner_id) {
      res.status(401).json({ message: "Unauthorized. User ID missing." });
      return;
    }

    const properties = await Property.findAll({
      where: { owner_id },
      include: [{ model: PropertyPhoto }], // Assuming association is set up to auto-fetch photos
    });

    res.json({
      message: "Properties fetched successfully",
      properties,
    });
  } catch (error) {
    console.error("Get Owner Properties Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const property = await Property.findByPk(propertyId);
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
    const payload: Record<string, unknown> = {};
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
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const property = await Property.findByPk(propertyId);
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
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { location, maxRent, amenities } = req.query;

    const whereClause: any = { isActive: true };

    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }

    if (maxRent) {
      whereClause.rent = { [Op.lte]: parseFloat(maxRent as string) };
    }

    if (amenities) {
      whereClause.amenities = { [Op.like]: `%${amenities}%` };
    }

    const properties = await Property.findAll({
      where: whereClause,
      include: [{ model: PropertyPhoto }],
    });

    res.json({
      message: "Properties fetched successfully",
      properties,
    });
  } catch (error) {
    console.error("Get All Properties Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idParam = req.params.id;
    const propertyId = parseInt(idParam, 10);
    if (Number.isNaN(propertyId)) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    const property = await Property.findOne({
      where: { id: propertyId, isActive: true },
      include: [{ model: PropertyPhoto }],
    });

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res.json({
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    console.error("Get Property By ID Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
