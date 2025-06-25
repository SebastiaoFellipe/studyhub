import express from "express";
import { getDecks, getDeckById, createDeck, updateDeck, deleteDeck } from "../controllers/flashcardDeckController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDecks);
router.get("/:id", protect, getDeckById);
router.post("/", protect, createDeck);
router.put("/:id", protect, updateDeck);
router.delete("/:id", protect, deleteDeck);

export default router;
