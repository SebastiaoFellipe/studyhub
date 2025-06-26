import { create } from "zustand";
import api from '../api/api';

export const useNoteStore = create((set) => ({
    notes: [],
    currentNote: null,
    loading: false,
    error: null,

    // Buscar todas as notas
    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/notes');
            set({ notes: response.data.data, loading: false });
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao buscar as anotações.";
            set({ loading: false, error: message });
        }
    },

    // Buscar uma anotação específica pelo ID
    fetchNoteById: async (noteId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/notes/${noteId}`);
            set({ currentNote: response.data.data, loading: false });
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao buscar a anotação.";
            set({ loading: false, error: message });
            return null;
        }
    },

    // Criar uma nova anotação
    createNote: async (noteData) => {
        set({ loading: true });
        try {
            const response = await api.post('/notes', noteData);
            set((state) => ({
                notes: [...state.notes, response.data.data],
                loading: false,
            }));
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao criar a anotação.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Atualizar uma anotação
    updateNote: async (noteId, updates) => {
        set({ loading: true });
        try {
            const response = await api.put(`/notes/${noteId}`, updates);
            set((state) => ({
                notes: state.notes.map((note) =>
                    note._id === noteId ? response.data.data : note
                ),
                currentNote: state.currentNote?._id === noteId ? response.data.data : state.currentNote,
                loading: false,
            }));
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao atualizar a anotação.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Deletar uma anotação
    deleteNote: async (noteId) => {
        set({ loading: true });
        try {
            await api.delete(`/notes/${noteId}`);
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== noteId),
                loading: false,
            }));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao deletar a anotação.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },
    
    // Limpar anotação atual ao sair da página de edição/visualização
    clearCurrentNote: () => set({ currentNote: null }),
}));