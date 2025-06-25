import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,
    error: null,

    // Função para buscar todas as tarefas
    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks`);
            set({ tasks: response.data.data, loading: false });
        } catch (err) {
            console.error("Error fetching tasks in store:", err);
            set({ loading: false, error: err.message || "Failed to fetch tasks" });
        }
    },

    // Função para criar uma nova tarefa
    createTask: async (newTask) => {
        if (!newTask.title) {
            return { success: false, message: "Please provide a title." };
        }
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
            set((state) => ({
                tasks: [...state.tasks, response.data.data],
                loading: false
            }));
            return { success: true, message: "Task created successfully" };
        } catch (err) {
            console.error("Error creating task in store:", err);
            set({ loading: false, error: err.message || "Failed to create task" });
            return { success: false, message: err.response?.data?.message || "Server Error" };
        }
    },

    // Função para atualizar uma tarefa existente
    updateTask: async (taskId, updatedTaskData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedTaskData);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === taskId ? response.data.data : task
                ),
                loading: false
            }));
            return { success: true, message: "Task updated successfully" };
        } catch (err) {
            console.error("Error updating task in store:", err);
            set({ loading: false, error: err.message || "Failed to update task" });
            return { success: false, message: err.response?.data?.message || "Server Error" };
        }
    },

    // Função para deletar uma tarefa
    deleteTask: async (taskId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== taskId),
                loading: false
            }));
            return { success: true, message: "Task deleted successfully" };
        } catch (err) {
            console.error("Error deleting task in store:", err);
            set({ loading: false, error: err.message || "Failed to delete task" });
            return { success: false, message: err.response?.data?.message || "Server Error" };
        }
    },
}));