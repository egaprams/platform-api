// src/controllers/movie.controller.js
import { Movie } from "../models/index.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      attributes: ["id", "title", "description", "year", "poster_url", "created_at", "genre", "rating"],
      order: [["created_at", "DESC"]],
    });

    return res.json({
      message: "Daftar film",
      data: movies,
    });
  } catch (error) {
    console.error("Get movies error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id, {
      attributes: ["id", "title", "description", "year", "poster_url", "created_at", "genre", "rating"],
    });

    if (!movie) {
      return res.status(404).json({ message: "Film tidak ditemukan" });
    }

    return res.json({
      message: "Detail film",
      data: movie,
    });
  } catch (error) {
    console.error("Get movie by id error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const createMovie = async (req, res) => {
  try {
    const body = req.body;

    // Bulk create jika array
    if (Array.isArray(body)) {
      if (body.length === 0) {
        return res.status(400).json({ message: "Data film tidak boleh kosong" });
      }

      const movies = await Movie.bulkCreate(body);

      return res.status(201).json({
        message: "Berhasil menambahkan banyak film",
        count: movies.length,
        data: movies,
      });
    }

    // Single create
    const { title, description, year, poster_url, genre, rating } = body;

    if (!title || !poster_url) {
      return res.status(400).json({
        message: "Field title dan poster_url wajib diisi",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      year,
      poster_url,
      genre,
      rating
    });

    return res.status(201).json({
      message: "Film berhasil ditambahkan",
      data: movie,
    });
  } catch (error) {
    console.error("Create movie error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};