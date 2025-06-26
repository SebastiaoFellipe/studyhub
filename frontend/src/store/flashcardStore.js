import { create } from "zustand";
import api from '../api/api';

export const useFlashcardStore = create((set) => ({
    decks: [],
    currentDeck: null,
    cardsToReview: [],
    loading: false,
    error: null,

    // Deck Actions
    fetchDecks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/decks');
            set({ decks: response.data.data, loading: false });
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao buscar os decks.";
            set({ loading: false, error: message });
        }
    },

    fetchDeckById: async (deckId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/decks/${deckId}`);
            set({ currentDeck: response.data.data, loading: false });
            return response.data.data;
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao buscar o deck.";
            set({ loading: false, error: message });
        }
    },

    createDeck: async (deckData) => {
        set({ loading: true });
        try {
            const response = await api.post('/decks', deckData);
            set((state) => ({
                decks: [...state.decks, response.data.data],
                loading: false,
            }));
            return { success: true, data: response.data.data };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao criar o deck.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    updateDeck: async (deckId, updates) => {
        set({ loading: true });
        try {
            const response = await api.put(`/decks/${deckId}`, updates);
            set((state) => ({
                decks: state.decks.map((deck) =>
                    deck._id === deckId ? response.data.data : deck
                ),
                currentDeck: state.currentDeck?._id === deckId ? response.data.data : state.currentDeck,
                loading: false,
            }));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao atualizar o deck.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    deleteDeck: async (deckId) => {
        set({ loading: true });
        try {
            await api.delete(`/decks/${deckId}`);
            set((state) => ({
                decks: state.decks.filter((deck) => deck._id !== deckId),
                loading: false,
            }));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao deletar o deck.";
            set({ loading: false, error: message });
            return { success: false, message };
        }
    },

    // Card Actions
    fetchCardsToReview: async (deckId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/decks/${deckId}/review`);
            set({ cardsToReview: response.data.data, loading: false });
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao buscar cartões para revisão.";
            set({ loading: false, error: message });
        }
    },
    
    reviewCard: async (deckId, cardId, wasCorrect) => {
        try {
            await api.post(`/decks/${deckId}/cards/${cardId}/review`, { wasCorrect });
            // Remove o cartão da lista da sessão de estudo atual
            set((state) => ({
                cardsToReview: state.cardsToReview.filter(card => card._id !== cardId)
            }));
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao registrar a revisão.";
            return { success: false, message };
        }
    },

    createCard: async (deckId, cardData) => {
        try {
            const response = await api.post(`/decks/${deckId}/cards`, cardData);
            set((state) => {
                const updatedDeck = {
                    ...state.currentDeck,
                    cards: [...state.currentDeck.cards, response.data.data],
                };
                return {
                    currentDeck: updatedDeck,
                    decks: state.decks.map(d => d._id === deckId ? { ...d, cards: [...d.cards, response.data.data._id] } : d)
                };
            });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao criar o card.";
            return { success: false, message };
        }
    },

    updateCard: async (deckId, cardId, cardData) => {
        try {
            const response = await api.put(`/decks/${deckId}/cards/${cardId}`, cardData);
            set((state) => {
                const updatedCards = state.currentDeck.cards.map((card) =>
                    card._id === cardId ? response.data.data : card
                );
                return { currentDeck: { ...state.currentDeck, cards: updatedCards } };
            });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao atualizar o card.";
            return { success: false, message };
        }
    },

    deleteCard: async (deckId, cardId) => {
        try {
            await api.delete(`/decks/${deckId}/cards/${cardId}`);
            set((state) => {
                const updatedCards = state.currentDeck.cards.filter((card) => card._id !== cardId);
                return {
                    currentDeck: { ...state.currentDeck, cards: updatedCards },
                    decks: state.decks.map(d => d._id === deckId ? { ...d, cards: d.cards.filter(cId => cId !== cardId) } : d)
                };
            });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Falha ao deletar o card.";
            return { success: false, message };
        }
    },
}));