import mongoose from "mongoose";
import FlashcardDeck from "../models/flashcardDeckModel.js";
import Card from "../models/cardModel.js";

export const getCards = async (req, res) => {
  const { deckId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return res.status(404).json({ success: false, message: "ID de deck inválido" });
  }

  try {
    // Verifica se o deck pertence ao usuário
    const deck = await FlashcardDeck.findOne({ _id: deckId, user: req.user._id });
    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck não encontrado" });
    }

    const cards = await Card.find({ deck: deckId, user: req.user._id }).sort({ nextReviewDue: 1 });
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.error("Erro ao listar cards:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const createCard = async (req, res) => {
  const { deckId } = req.params;
  const { front, back } = req.body;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return res.status(404).json({ success: false, message: "ID de deck inválido" });
  }
  if (!front || !back) {
    return res.status(400).json({ success: false, message: "Frente e verso são obrigatórios" });
  }

  try {
    const deck = await FlashcardDeck.findOne({ _id: deckId, user: req.user._id });
    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck não encontrado" });
    }

    const newCard = new Card({
      deck: deckId,
      front,
      back,
      user: req.user._id,
    });
    await newCard.save();

    // adiciona ao array de cards do deck
    deck.cards.push(newCard._id);
    await deck.save();

    res.status(201).json({ success: true, data: newCard });
  } catch (error) {
    console.error("Erro ao criar card:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const updateCard = async (req, res) => {
  const { deckId, id } = req.params;
  const updates = (({ front, back, lastReviewed, nextReviewDue, correctStreak }) => 
    ({ front, back, lastReviewed, nextReviewDue, correctStreak }))(req.body);

  if (![deckId, id].every(mongoose.Types.ObjectId.isValid)) {
    return res.status(404).json({ success: false, message: "ID inválido" });
  }

  try {
    // Garante propriedade e pertença ao deck
    const card = await Card.findOneAndUpdate(
      { _id: id, deck: deckId, user: req.user._id },
      updates,
      { new: true }
    );
    if (!card) {
      return res.status(404).json({ success: false, message: "Card não encontrado" });
    }
    res.status(200).json({ success: true, data: card });
  } catch (error) {
    console.error("Erro ao atualizar card:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const deleteCard = async (req, res) => {
  const { deckId, id } = req.params;
  if (![deckId, id].every(mongoose.Types.ObjectId.isValid)) {
    return res.status(404).json({ success: false, message: "ID inválido" });
  }

  try {
    const card = await Card.findOneAndDelete({ _id: id, deck: deckId, user: req.user._id });
    if (!card) {
      return res.status(404).json({ success: false, message: "Card não encontrado" });
    }

    // remove do array de cards do deck
    await FlashcardDeck.findByIdAndUpdate(deckId, { $pull: { cards: id } });

    res.status(200).json({ success: true, message: "Card deletado" });
  } catch (error) {
    console.error("Erro ao deletar card:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

// Função para calcular a próxima data de revisão
const calculateNextReviewDue = (streak) => {
    // A cada acerto, o intervalo dobra (2, 4, 8, 16... dias)
    const daysToAdd = Math.pow(2, streak);
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + daysToAdd);
    return nextDueDate;
};

// Retorna apenas os cartões prontos para revisão
export const getCardsToReview = async (req, res) => {
    const { deckId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(deckId)) {
        return res.status(404).json({ success: false, message: "ID de deck inválido" });
    }

    try {
        const deck = await FlashcardDeck.findOne({ _id: deckId, user: req.user._id });
        if (!deck) {
            return res.status(404).json({ success: false, message: "Deck não encontrado" });
        }

        const cardsToReview = await Card.find({
            deck: deckId,
            user: req.user._id,
            nextReviewDue: { $lte: new Date() } // Apenas cartões com revisão pendente
        }).sort({ nextReviewDue: 1 }); // Mais antigos primeiro

        res.status(200).json({ success: true, data: cardsToReview });
    } catch (error) {
        console.error("Erro ao listar cards para revisão:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

// Nova função para registrar a revisão de um cartão
export const reviewCard = async (req, res) => {
    const { id } = req.params;
    const { wasCorrect } = req.body; // true ou false

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "ID de card inválido" });
    }

    try {
        const card = await Card.findOne({ _id: id, user: req.user._id });
        if (!card) {
            return res.status(404).json({ success: false, message: "Card não encontrado" });
        }

        let updatedStreak;
        let nextReviewDue;

        if (wasCorrect) {
            updatedStreak = card.correctStreak + 1;
            nextReviewDue = calculateNextReviewDue(updatedStreak);
        } else {
            updatedStreak = 0; // Zera a sequência
            const oneDayFromNow = new Date();
            oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
            nextReviewDue = oneDayFromNow;
        }

        const updatedCard = await Card.findByIdAndUpdate(
            id,
            {
                lastReviewed: new Date(),
                correctStreak: updatedStreak,
                nextReviewDue: nextReviewDue,
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
        console.error("Erro ao revisar card:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};