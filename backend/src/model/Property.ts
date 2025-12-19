import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

export class Property extends Model {
  public id!: number;
  public title!: string;
  public location!: string;
  public owner_id!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Property.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    rent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 1 }
    },
    location: { type: DataTypes.STRING, allowNull: false },
    amenities: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  { sequelize, tableName: "properties" }
);

Property.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
User.hasMany(Property, { foreignKey: "owner_id" });
