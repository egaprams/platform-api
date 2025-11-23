import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, ... }
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

export default authMiddleware;
