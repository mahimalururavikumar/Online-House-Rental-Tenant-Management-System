import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: {
      type: DataTypes.ENUM("OWNER", "TENANT", "ADMIN"),
      allowNull: false
    },
    profilePhoto: DataTypes.STRING
  },
  { sequelize, tableName: "users" }
);
