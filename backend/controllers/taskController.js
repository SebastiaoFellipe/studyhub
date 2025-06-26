import mongoose from "mongoose";
import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Não autorizado" });
        }
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.log("Error in fetching tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, isCompleted } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Não autorizado" });
        }

        if (!title) {
            return res.status(400).json({ success: false, message: "O título é obrigatório" });
        }

        const newTask = new Task({
            title,
            description,
            priority,
            isCompleted,
            user: req.user.id,
        });

        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Erro ao criar tarefa:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "ID da tarefa inválido" });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: "Tarefa não encontrada ou não autorizada" });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "ID da tarefa inválido" });
        }

        const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ success: false, message: "Tarefa não encontrada ou não autorizada" });
        }

        res.status(200).json({ success: true, message: "Tarefa deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error.message);
        res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};

export const deleteAllTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Não autorizado" });
        }

        await Task.deleteMany({ user: req.user.id });

        res.status(200).json({ success: true, message: "Todas as tarefas foram deletadas com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar todas as tarefas:", error.message);
        res.status(500).json({ success: false, message: "Erro no Servidor" });
    }
};