// src/models/userLike.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UserLike = sequelize.define(
  "UserLike",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "user_likes",
    timestamps: true,
    underscored: true,
  }
);


