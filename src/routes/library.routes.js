// src/routes/library.routes.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getLikedMovies,
  addLikedMovie,
  removeLikedMovie,
  getWatchlist,
  addWatchlistMovie,
  removeWatchlistMovie,
} from "../controllers/library.controller.js";

const router = express.Router();

// semua endpoint di sini harus login
router.use(authMiddleware);

// /api/me/likes
router.get("/likes", getLikedMovies);
router.post("/likes", addLikedMovie);
router.delete("/likes/:movieId", removeLikedMovie);

// /api/me/watchlist
router.get("/watchlist", getWatchlist);
router.post("/watchlist", addWatchlistMovie);
router.delete("/watchlist/:movieId", removeWatchlistMovie);

export default router;
