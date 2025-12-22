import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "OWNER" | "TENANT" | "ADMIN";
  public contact!: string;
  public profilePhoto!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("OWNER", "TENANT", "ADMIN"),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePhoto: DataTypes.STRING
  },
  { sequelize, tableName: "users" }
);
