import { User } from "../models/index.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "created_at"],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    return res.json({
      message: "Profile user",
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
