// src/models/index.js
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Movie } from "./movie.model.js";
import { UserLike } from "./userLike.model.js";
import { Watchlist } from "./watchlist.model.js";

// ===== Associations =====

// User - UserLike
User.hasMany(UserLike, { foreignKey: "user_id", as: "likes" });
UserLike.belongsTo(User, { foreignKey: "user_id", as: "user" });

// User - Watchlist
User.hasMany(Watchlist, { foreignKey: "user_id", as: "watchlists" });
Watchlist.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Movie - UserLike
Movie.hasMany(UserLike, { foreignKey: "movie_id", as: "movieLikes" });
UserLike.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });

// Movie - Watchlist
Movie.hasMany(Watchlist, { foreignKey: "movie_id", as: "movieWatchlists" });
Watchlist.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });

const db = {
  sequelize,
  User,
  Movie,
  UserLike,
  Watchlist,
};

export { sequelize, User, Movie, UserLike, Watchlist };
export default db;
