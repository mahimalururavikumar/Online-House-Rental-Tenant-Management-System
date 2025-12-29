import express from "express";
import { addProperty, getOwnerProperties, updateProperty, deleteProperty, getAllProperties, getPropertyById } from "../controller/PropertyController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Owner Routes
router.post(
    "/",
    authMiddleware,
    authorizeRoles("OWNER"),
    addProperty
);

router.get(
    "/owner",
    authMiddleware,
    authorizeRoles("OWNER"),
    getOwnerProperties
);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("OWNER"),
    updateProperty
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("OWNER"),
    deleteProperty
);

// Tenant Routes
router.get(
    "/",
    authMiddleware,
    authorizeRoles("TENANT"),
    getAllProperties
);

router.get(
    "/:id",
    authMiddleware,
    authorizeRoles("TENANT"),
    getPropertyById
);

export default router;
