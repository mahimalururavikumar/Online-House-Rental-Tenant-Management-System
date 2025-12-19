import express from "express";
import { sequelize } from "./config/database";

const app = express();
app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
