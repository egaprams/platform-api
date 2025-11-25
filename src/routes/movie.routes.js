// src/routes/movie.routes.js
import express from "express";
import { getMovies, getMovieById, createMovie } from "../controllers/movie.controller.js";
import authMiddleware from "../middleware/auth.js";


const router = express.Router();

router.get("/",authMiddleware,  getMovies);
router.post("/", authMiddleware, createMovie);
router.get("/:id", getMovieById);

export default router;
