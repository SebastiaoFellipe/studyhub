import express from "express";
import { getCards, createCard, updateCard, deleteCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/decks/:deckId/cards", protect, getCards);
router.post("/decks/:deckId/cards", protect, createCard);
router.put("/decks/:deckId/cards/:id", protect, updateCard);
router.delete("/decks/:deckId/cards/:id", protect, deleteCard);

export default router;