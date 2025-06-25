import mongoose from "mongoose";
import FlashcardDeck from "../models/flashcardDeckModel.js";
import Card from "../models/cardModel.js";

export const getDecks = async (req, res) => {
  try {
    const decks = await FlashcardDeck.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error("Erro ao listar decks:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const getDeckById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "ID de deck inválido" });
  }

  try {
    const deck = await FlashcardDeck.findOne({ _id: id, user: req.user._id }).populate("cards");
    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck não encontrado" });
    }
    res.status(200).json({ success: true, data: deck });
  } catch (error) {
    console.error("Erro ao buscar deck:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const createDeck = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: "Título é obrigatório" });
  }

  try {
    const newDeck = new FlashcardDeck({
      title,
      description,
      user: req.user._id,
      cards: []
    });
    await newDeck.save();
    res.status(201).json({ success: true, data: newDeck });
  } catch (error) {
    console.error("Erro ao criar deck:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const updateDeck = async (req, res) => {
  const { id } = req.params;
  const updates = (({ title, description }) => ({ title, description }))(req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "ID de deck inválido" });
  }

  try {
    const deck = await FlashcardDeck.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true }
    );
    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck não encontrado" });
    }
    res.status(200).json({ success: true, data: deck });
  } catch (error) {
    console.error("Erro ao atualizar deck:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};

export const deleteDeck = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "ID de deck inválido" });
  }

  try {
    // Remove todos os cards do deck antes de apagar o deck
    await Card.deleteMany({ deck: id, user: req.user._id });
    const deck = await FlashcardDeck.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deck) {
      return res.status(404).json({ success: false, message: "Deck não encontrado" });
    }
    res.status(200).json({ success: true, message: "Deck e cards associados removidos" });
  } catch (error) {
    console.error("Erro ao deletar deck:", error.message);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
};