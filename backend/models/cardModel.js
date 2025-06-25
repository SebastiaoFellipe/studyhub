// backend/models/card.model.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardDeck',
        required: true,
        index: true,
    },
    front: {
        type: String,
        required: true,
        trim: true,
    },
    back: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Campos para estatísticas e repetição espaçada
    lastReviewed: {
        type: Date,
        default: null,
    },
    nextReviewDue: {
        type: Date,
        default: () => new Date(),
        index: true,
    },
    correctStreak: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Card = mongoose.model("Card", cardSchema);

export default Card;