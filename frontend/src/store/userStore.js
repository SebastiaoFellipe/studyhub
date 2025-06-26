import { create } from "zustand";
import api from '../api/api';

export const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,

    // Ação de Login
    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/auth/login', credentials);
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            set({ user, isAuthenticated: true, loading: false });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Erro ao fazer login.";
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    // Ação de Registro
    register: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/auth/register', userData);
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            set({ user, isAuthenticated: true, loading: false });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Erro ao registrar.";
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    // Ação de Logout
    logout: () => {
        localStorage.removeItem('authToken');
        set({ user: null, isAuthenticated: false, error: null });
    },
    
    // Ação para buscar dados do usuário (se já estiver logado)
    fetchUser: async () => {
        if (!localStorage.getItem('authToken')) return; // Não faz nada se não houver token
        set({ loading: true });
        try {
            const response = await api.get('/auth/getUser');
            set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (err) {
            console.error("Sessão expirada ou token inválido.", err);
            // Limpa o estado se o token for inválido
            set({ user: null, isAuthenticated: false, loading: false });
            localStorage.removeItem('authToken');
        }
    },
}));