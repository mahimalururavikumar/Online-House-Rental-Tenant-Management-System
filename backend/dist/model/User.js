"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: {
        type: sequelize_1.DataTypes.ENUM("OWNER", "TENANT", "ADMIN"),
        allowNull: false
    },
    contact: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profilePhoto: sequelize_1.DataTypes.STRING
}, { sequelize: database_1.sequelize, tableName: "users" });
