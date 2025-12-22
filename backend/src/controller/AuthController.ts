import { Request, Response } from "express";
import { User } from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { name, email, password, role, contact } = req.body;

        if (!name || !email || !password || !role || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (role != "TENANT" && role != "OWNER") {
            return res.status(400).json({ message: "Invalid role. Must be 'TENANT' or 'OWNER'" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            contact
        });

        return res.status(201).json({ message: "User created successfully", userId: user.id });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error });
    }
}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        if (process.env.NODE_ENV != "development") {
            return res.status(403).json({ message: "Admin registration is restricted to development environment only" });
        }

        const { name, email, password, contact } = req.body;

        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN",
            contact
        });

        return res.status(201).json({ message: "Admin created successfully", userId: user.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "fallback_secret_key",
            { expiresIn: "1d" }
        );

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
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};