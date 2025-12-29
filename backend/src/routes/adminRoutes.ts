import express from "express";
import { getAllUsers, getAllProperties, getAllBookings, updatePropertyStatus } from "../controller/AdminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Admin: View All Users
router.get(
    "/users",
    authMiddleware,
    authorizeRoles("ADMIN"),
    getAllUsers
);

// Admin: View All Properties
router.get(
    "/properties",
    authMiddleware,
    authorizeRoles("ADMIN"),
    getAllProperties
);

// Admin: View All Bookings
router.get(
    "/bookings",
    authMiddleware,
    authorizeRoles("ADMIN"),
    getAllBookings
);

// Admin: Block/Unblock Property
router.patch(
    "/properties/:id/status",
    authMiddleware,
    authorizeRoles("ADMIN"),
    updatePropertyStatus
);

export default router;
