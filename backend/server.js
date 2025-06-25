import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoute.js";
import authRoutes from "./routes/authRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import flashcardDeckRoutes from "./routes/flashcardDeckRoute.js";
import cardRoutes from "./routes/cardRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/decks", flashcardDeckRoutes);
app.use("/api", cardRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});