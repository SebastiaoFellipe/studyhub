import mongoose from "mongoose";
import Note from "../models/noteModel.js";

// Obter todas as notas do usuário
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.error("Erro ao buscar notas:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

// Criar nova nota
export const createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Título e conteúdo são obrigatórios" });
    }

    const newNote = new Note({
        title,
        content,
        user: req.user._id,
    });

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Erro ao criar nota:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

// Atualizar nota
export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "ID inválido" });
    }

    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Nota não encontrada ou não autorizada" });
        }

        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        console.error("Erro ao atualizar nota:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

// Deletar nota
export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "ID inválido" });
    }

    try {
        const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user._id });

        if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Nota não encontrada ou não autorizada" });
        }

        res.status(200).json({ success: true, message: "Nota deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar nota:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};
