import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // null jika guest
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    display_name: {
      // Nama yang akan ditampilkan di halaman review
      // - User terdaftar: pakai username (User.name)
      // - Guest: "Anonymous"
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "reviews",
    timestamps: true,
    underscored: true,
  }
);


