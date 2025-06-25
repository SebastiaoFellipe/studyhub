import mongoose from "mongoose";

const flashcardDeckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título do grupo de flashcards é obrigatório."],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }]
}, {
    timestamps: true
});

const FlashcardDeck = mongoose.model("FlashcardDeck", flashcardDeckSchema);

export default FlashcardDeck;