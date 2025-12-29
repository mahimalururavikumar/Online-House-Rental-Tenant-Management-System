"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: { min: 1, max: 5 }
    },
    comment: sequelize_1.DataTypes.TEXT
}, { sequelize: database_1.sequelize, tableName: "reviews" });
