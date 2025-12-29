"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "Access Denied. No token provided." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "fallback_secret_key");
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
exports.authMiddleware = authMiddleware;
