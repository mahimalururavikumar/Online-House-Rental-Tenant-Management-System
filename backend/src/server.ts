import express from "express";
import { sequelize } from "./config/database";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Changed strictly to users to avoid conflict if any, though user likely wants auth routes separate

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
