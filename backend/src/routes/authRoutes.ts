import express from "express";
import { registerUser, registerAdmin, login, loginAdmin } from "../controller/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", login);
router.post("/login-admin", loginAdmin);

export default router;
