"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default); // Changed strictly to users to avoid conflict if any, though user likely wants auth routes separate
app.use("/api/properties", propertyRoutes_1.default);
database_1.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
