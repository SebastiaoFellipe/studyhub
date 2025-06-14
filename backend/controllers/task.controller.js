import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.log("error in fetching tasks:", error.message);
        res.status(500).json({ sucess: false, message: "Server Error" })
    }
}

export const createTask = async (req, res) => {
    const task = req.body;

    if (!task.title) {
        return res.status(400).json({ success: false, message: "Please provide a title"});
    }

    const newTask = new Task(task);

    try {
        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error("Error in create Task:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;

    const task = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Task Id" });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, task, {new:true});
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Task Id" });
    }

    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Task deleted" })
    } catch (error) {
        console.log("error in deleting tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}