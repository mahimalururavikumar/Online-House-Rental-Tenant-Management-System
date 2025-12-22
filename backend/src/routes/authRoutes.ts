import express from "express";
import { registerUser, registerAdmin, login } from "../controller/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", login);

export default router;
