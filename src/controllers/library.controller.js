// src/controllers/library.controller.js
import { Movie, UserLike, Watchlist } from "../models/index.js";

// helper
const getUserId = (req) => req.user?.id;

// ===== LIKED MOVIES =====

export const getLikedMovies = async (req, res) => {
  try {
    const userId = getUserId(req);

    const likes = await UserLike.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: ["id", "title", "description", "year", "poster_url"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const movies = likes.map((like) => like.movie);

    return res.json({
      message: "Daftar film yang disukai",
      data: movies,
    });
  } catch (error) {
    console.error("Get liked movies error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const addLikedMovie = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId wajib diisi" });
    }

    // cek film ada atau tidak
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    // cek duplikat
    const existing = await UserLike.findOne({
      where: { user_id: userId, movie_id: movieId },
    });

    if (!existing) {
      await UserLike.create({
        user_id: userId,
        movie_id: movieId,
      });
    }

    return res.status(201).json({ message: "Film ditambahkan ke liked" });
  } catch (error) {
    console.error("Add liked movie error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const removeLikedMovie = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { movieId } = req.params;

    await UserLike.destroy({
      where: { user_id: userId, movie_id: movieId },
    });

    return res.json({ message: "Film dihapus dari liked" });
  } catch (error) {
    console.error("Remove liked movie error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ===== WATCHLIST =====

export const getWatchlist = async (req, res) => {
  try {
    const userId = getUserId(req);

    const items = await Watchlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: ["id", "title", "description", "year", "poster_url"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const movies = items.map((item) => item.movie);

    return res.json({
      message: "Daftar watchlist",
      data: movies,
    });
  } catch (error) {
    console.error("Get watchlist error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const addWatchlistMovie = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId wajib diisi" });
    }

    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    const existing = await Watchlist.findOne({
      where: { user_id: userId, movie_id: movieId },
    });

    if (!existing) {
      await Watchlist.create({
        user_id: userId,
        movie_id: movieId,
      });
    }

    return res.status(201).json({ message: "Film ditambahkan ke watchlist" });
  } catch (error) {
    console.error("Add watchlist movie error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const removeWatchlistMovie = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { movieId } = req.params;

    await Watchlist.destroy({
      where: { user_id: userId, movie_id: movieId },
    });

    return res.json({ message: "Film dihapus dari watchlist" });
  } catch (error) {
    console.error("Remove watchlist movie error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
