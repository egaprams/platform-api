import express from "express";
import { getReviewsByMovie, createReview } from "../controllers/review.controller.js";

const router = express.Router();

// Guest dan user yang login bisa melihat & membuat review
// - Guest: display_name = "Anonymous"
// - User login: display_name = username (User.name)

// GET /api/movies/:movieId/reviews
router.get("/:movieId/reviews", getReviewsByMovie);

// POST /api/movies/:movieId/reviews
router.post("/:movieId/reviews", createReview);

export default router;


