import express from "express";
import { createBooking, getTenantBookings, getBookingRequests, updateBookingStatus, getOwnerAllBookings } from "../controller/BookingController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Owner: Approve/Reject Booking
router.patch(
    "/:bookingId",
    authMiddleware,
    authorizeRoles("OWNER"),
    updateBookingStatus
);

// Owner: View Booking Requests for a Property
router.get(
    "/property/:propertyId",
    authMiddleware,
    authorizeRoles("OWNER"),
    getBookingRequests
);

// Tenant: View My Bookings
router.get(
    "/my",
    authMiddleware,
    authorizeRoles("TENANT"),
    getTenantBookings
);

// Owner: View All Booking Requests
router.get(
    "/owner-requests",
    authMiddleware,
    authorizeRoles("OWNER"),
    getOwnerAllBookings
);

// Tenant: Request Booking
router.post(
    "/:propertyId",
    authMiddleware,
    authorizeRoles("TENANT"),
    createBooking
);

export default router;
