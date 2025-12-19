import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Property } from "./Property";

export class PropertyPhoto extends Model {}

PropertyPhoto.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    photoUrl: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, tableName: "property_photos" }
);

PropertyPhoto.belongsTo(Property, { foreignKey: "property_id" });
Property.hasMany(PropertyPhoto, { foreignKey: "property_id" });
