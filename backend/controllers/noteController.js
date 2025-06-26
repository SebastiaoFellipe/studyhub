import mongoose from "mongoose";
import Note from "../models/noteModel.js";

// Obter todas as notas do usuário
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        console.error('Erro ao buscar anotações:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

// Criar nova nota
export const getNoteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'ID de anotação inválido' });
        }

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Anotação não encontrada' });
        }

        // Garante que a anotação pertence ao usuário logado
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Não autorizado' });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        console.error('Erro ao buscar anotação por ID:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

// Criar nota
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'O título é obrigatório' });
        }

        const note = await Note.create({
            user: req.user.id,
            title,
            content: content || {}, // Garante que o conteúdo seja pelo menos um objeto vazio
        });

        res.status(201).json({ success: true, data: note });
    } catch (error) {
        console.error('Erro ao criar anotação:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

// Atualizar nota
export const updateNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'ID de anotação inválido' });
        }

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Anotação não encontrada' });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Não autorizado' });
        }
        
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: 'O título é obrigatório' });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        console.error('Erro ao atualizar anotação:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

// Deletar nota
export const deleteNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: 'ID de anotação inválido' });
        }
        
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Anotação não encontrada' });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Não autorizado' });
        }

        await note.deleteOne(); // Usar o método no documento para acionar middleware, se houver

        res.status(200).json({ success: true, message: 'Anotação deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar anotação:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
