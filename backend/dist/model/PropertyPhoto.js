"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPhoto = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Property_1 = require("./Property");
class PropertyPhoto extends sequelize_1.Model {
}
exports.PropertyPhoto = PropertyPhoto;
PropertyPhoto.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    photoUrl: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, { sequelize: database_1.sequelize, tableName: "property_photos" });
PropertyPhoto.belongsTo(Property_1.Property, { foreignKey: "property_id" });
Property_1.Property.hasMany(PropertyPhoto, { foreignKey: "property_id" });
