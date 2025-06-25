import mongoose from "mongoose";
import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.log("Error in fetching tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createTask = async (req, res) => {
    const { title, description, priority, isCompleted } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" });
    }

    const validPriorities = ['Baixa', 'Média', 'Alta'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ success: false, message: "Invalid priority value" });
    }

    const newTask = new Task({
        title,
        description,
        priority,
        isCompleted,
        user: req.user._id,
    });

    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Error in create Task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Task ID" });
    }

    if (updates.priority) {
        const validPriorities = ['Baixa', 'Média', 'Alta'];
        if (!validPriorities.includes(updates.priority)) {
            return res.status(400).json({ success: false, message: "Invalid priority value" });
        }
    }

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id },
            updates,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found or not authorized" });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Task ID" });
    }

    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found or not authorized" });
        }

        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        console.log("Error in deleting task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};