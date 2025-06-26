import { create } from "zustand";
import api from '../api/api'; 

export const useTaskStore = create((set, get) => ({
    tasks: [],
    loading: false,
    error: null,

    // Função para buscar todas as tarefas do usuário logado
    fetchTasks: async () => {
        // Verifica se já não está carregando para evitar chamadas duplicadas
        if (get().loading) return;
        set({ loading: true, error: null });
        try {
            // 2. Usar a instância 'api' que já contém a baseURL e o interceptor de token
            const response = await api.get('/tasks');
            set({ tasks: response.data.data || [], loading: false });
        } catch (err) {
            console.error("Erro ao buscar tarefas no store:", err);
            const message = err.response?.data?.message || "Falha ao buscar tarefas";
            set({ loading: false, error: message });
        }
    },

    // Função para criar uma nova tarefa
    createTask: async (newTask) => {
        if (!newTask.title) {
            return { success: false, message: "Por favor, forneça um título." };
        }
        set({ loading: true, error: null });
        try {
            const response = await api.post('/tasks', newTask);
            set((state) => ({
                tasks: [...state.tasks, response.data.data],
                loading: false
            }));
            return { success: true };
        } catch (err) {
            console.error("Erro ao criar tarefa no store:", err);
            const message = err.response?.data?.message || "Erro no servidor ao criar tarefa";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Função para atualizar o status de conclusão de uma tarefa
    toggleTaskCompletion: async (taskId, isCompleted) => {
        set((state) => ({
            tasks: state.tasks.map(task =>
                task._id === taskId ? { ...task, isCompleted } : task
            ),
        }));
        try {
            await api.put(`/tasks/${taskId}`, { isCompleted });
            return { success: true };
        } catch (err) {
            // Reverte o estado em caso de erro na API
            set((state) => ({
                tasks: state.tasks.map(task =>
                    task._id === taskId ? { ...task, isCompleted: !isCompleted } : task
                ),
            }));
            const message = err.response?.data?.message || "Falha ao atualizar status da tarefa";
            return { success: false, message };
        }
    },

    // Função para atualizar uma tarefa existente
// Ação para atualizar uma tarefa (título, etc.)
    updateTask: async (taskId, updatedTaskData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/tasks/${taskId}`, updatedTaskData);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === taskId ? response.data.data : task
                ),
                loading: false
            }));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao atualizar tarefa";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Função para deletar uma tarefa
    deleteTask: async (taskId) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/tasks/${taskId}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== taskId),
                loading: false
            }));
            return { success: true };
        } catch (err) {
            console.error("Erro ao deletar tarefa no store:", err);
            const message = err.response?.data?.message || "Falha ao deletar tarefa";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Função para deletar todas as tarefas
    deleteAllTasks: async () => {
        set({ loading: true, error: null });
        try {
            await api.delete('/tasks');
            set({ tasks: [], loading: false });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao deletar todas as tarefas";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    }
}));