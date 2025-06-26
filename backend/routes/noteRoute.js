import express from "express";
import { createNote, deleteNote, getNotes, getNoteById, updateNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote); 
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
