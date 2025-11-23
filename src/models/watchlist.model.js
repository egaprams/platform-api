// src/models/watchlist.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Watchlist = sequelize.define(
  "Watchlist",
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
    tableName: "watchlists",
    timestamps: true,
    underscored: true,
  }
);
