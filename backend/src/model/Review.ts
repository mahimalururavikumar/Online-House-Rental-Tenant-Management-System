import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Review extends Model {
  public id!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    },
    comment: DataTypes.TEXT
  },
  { sequelize, tableName: "reviews" }
);
