// src/models/index.js
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Movie } from "./movie.model.js";
import { UserLike } from "./userLike.model.js";
import { Watchlist } from "./watchlist.model.js";
import { Review } from "./review.model.js";

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

Movie.hasMany(Review, {foreignKey: "movie_id", as: "movieReview" });
Review.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });

User.hasMany(Review, {foreignKey: "user_id", as: "userReview" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

const db = {
  sequelize,
  User,
  Movie,
  UserLike,
  Watchlist,
  Review
};

export { sequelize, User, Movie, UserLike, Watchlist, Review };
export default db;
