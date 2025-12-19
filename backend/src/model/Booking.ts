import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Property } from "./Property";
import { User } from "./User";

export class Booking extends Model {
  public id!: number;
  public property_id!: number;
  public tenant_id!: number;
  public status!: "Pending" | "Approved" | "Rejected";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        status: {
            type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
            defaultValue: "Pending"
        }
    },
    { sequelize, tableName: "bookings" }
);

Booking.belongsTo(Property, { foreignKey: "property_id" });
Booking.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });

Property.hasMany(Booking, { foreignKey: "property_id" });
User.hasMany(Booking, { foreignKey: "tenant_id" });
