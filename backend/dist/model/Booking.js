"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Property_1 = require("./Property");
const User_1 = require("./User");
class Booking extends sequelize_1.Model {
}
exports.Booking = Booking;
Booking.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending"
    }
}, { sequelize: database_1.sequelize, tableName: "bookings" });
Booking.belongsTo(Property_1.Property, { foreignKey: "property_id" });
Booking.belongsTo(User_1.User, { foreignKey: "tenant_id", as: "tenant" });
Property_1.Property.hasMany(Booking, { foreignKey: "property_id" });
User_1.User.hasMany(Booking, { foreignKey: "tenant_id" });
