import express from "express";
import { sequelize } from "./config/database";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
