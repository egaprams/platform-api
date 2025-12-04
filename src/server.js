// src/server.js
import app from "./app.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected via Sequelize");

    await sequelize.sync({ alter: true }); // tambahin { alter: true } kalau lagi dev
    console.log("Models synced");
  } catch (error) {
    console.error(
      "Gagal konek ke database. Server tetap dijalankan tanpa DB. Detail:",
      error.message
    );
  }
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
