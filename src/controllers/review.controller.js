import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Movie, Review, User } from "../models/index.js";

dotenv.config();

const getUserId = (req) => req.user?.id;


// helper: decode token jika ada, tapi tidak wajib
const getUserFromTokenIfAny = async (req) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return null;

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email"],
    });

    return user || null;
  } catch {
    // Jika token invalid, anggap saja sebagai guest (tidak error 401 di endpoint ini)
    return null;
  }
};

export const getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    const reviews = await Review.findAll({
      where: { movie_id: movieId },
      order: [["created_at", "DESC"]],
      attributes: ["id", "content", "rating", "user_id", "created_at"],
      include: {
        model: User,
        as: "user",
        attributes: ["id","name"]
      }
    });

    return res.json({
      message: "Daftar review film",
      data: reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { content, rating } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Field content wajib diisi" });
    }

    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }


    const userId = getUserId(req);
    // let displayName = "Anonymous";

    if (!userId) {
      console.log(userId)
      return res.status(401).json({
        error: "Invalid Token",
        message: "Token tidak ditemukan!"
      })
    }

    const review = await Review.create({
      movie_id: movie.id,
      user_id: userId,
      content,
      rating,
    });

    return res.status(201).json({
      message: "Review berhasil ditambahkan",
      data: {
        id: review.id,
        content: review.content,
        rating: review.rating,
        created_at: review.created_at,
      },
    });
  } catch (error) {
    console.error("Create review error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};


