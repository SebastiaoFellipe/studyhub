import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    priority: {
        type: String,
        enum: ['Baixa', 'Média', 'Alta'],
        default: 'Baixa'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

export default Task;