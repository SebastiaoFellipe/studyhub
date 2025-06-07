import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/task.route.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes)

app.listen(5000, () => {
    connectDB();
    console.log("server started at http://localhost:5000");
})