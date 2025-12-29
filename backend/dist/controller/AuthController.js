"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.login = exports.registerAdmin = exports.registerUser = void 0;
const User_1 = require("../model/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, contact } = req.body;
        if (!name || !email || !password || !role || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (role != "TENANT" && role != "OWNER") {
            return res.status(400).json({ message: "Invalid role. Must be 'TENANT' or 'OWNER'" });
        }
        const existingUser = await User_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.User.create({
            name,
            email,
            password: hashedPassword,
            role,
            contact
        });
        return res.status(201).json({ message: "User created successfully", userId: user.id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error });
    }
};
exports.registerUser = registerUser;
const registerAdmin = async (req, res) => {
    try {
        if (process.env.NODE_ENV != "development") {
            return res.status(403).json({ message: "Admin registration is restricted to development environment only" });
        }
        const { name, email, password, contact } = req.body;
        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.User.create({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN",
            contact
        });
        return res.status(201).json({ message: "Admin created successfully", userId: user.id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error });
    }
};
exports.registerAdmin = registerAdmin;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "fallback_secret_key", { expiresIn: "1d" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                contact: user.contact
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        if (user.role !== "ADMIN") {
            res.status(403).json({ message: "Access Denied. Not an Admin." });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "fallback_secret_key", { expiresIn: "1d" });
        res.json({
            message: "Admin Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                contact: user.contact
            },
        });
    }
    catch (error) {
        console.error("Admin Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginAdmin = loginAdmin;
