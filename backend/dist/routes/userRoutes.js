"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Example protected route: Get User Profile
router.get("/profile", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({
        message: "User profile fetched successfully",
        user: req.user, // This is now available thanks to authMiddleware
    });
});
exports.default = router;
