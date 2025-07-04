import express from "express";
import { createTask, deleteTask, deleteAllTasks, getTasks, updateTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.delete("/", protect, deleteAllTasks);

export default router;