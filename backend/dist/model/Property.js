"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
class Property extends sequelize_1.Model {
}
exports.Property = Property;
Property.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: sequelize_1.DataTypes.TEXT,
    rent: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 1 }
    },
    location: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    amenities: sequelize_1.DataTypes.STRING,
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true }
}, { sequelize: database_1.sequelize, tableName: "properties" });
Property.belongsTo(User_1.User, { foreignKey: "owner_id", as: "owner" });
User_1.User.hasMany(Property, { foreignKey: "owner_id" });
