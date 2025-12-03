import express from "express";
import { getReviewsByMovie, createReview } from "../controllers/review.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Guest dan user yang login bisa melihat & membuat review
// - Guest: display_name = "Anonymous"
// - User login: display_name = username (User.name)

// GET /api/movies/:movieId/reviews
router.get("/:movieId", getReviewsByMovie);

// POST /api/movies/:movieId/reviews
router.post("/:movieId", authMiddleware, createReview);

export default router;


