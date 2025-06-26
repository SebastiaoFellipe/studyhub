import express from "express";
import { getCards, createCard, updateCard, deleteCard, getCardsToReview, reviewCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/:deckId/cards", protect, getCards);
router.post("/:deckId/cards", protect, createCard);
router.put("/:deckId/cards/:id", protect, updateCard);
router.delete("/:deckId/cards/:id", protect, deleteCard);

router.get("/:deckId/review", protect, getCardsToReview);
router.post("/:deckId/cards/:id/review", protect, reviewCard);

export default router;