import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import libraryRoutes from "./routes/library.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/me", libraryRoutes);
app.use("/api/reviews", reviewRoutes )

export default app;
