import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Example protected route: Get User Profile
router.get("/profile", authMiddleware, (req: Request, res: Response) => {
    res.json({
        message: "User profile fetched successfully",
        user: req.user, // This is now available thanks to authMiddleware
    });
});

export default router;