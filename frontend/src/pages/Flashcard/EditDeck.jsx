import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlashcardStore } from '../../store/flashcardStore';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const EditDeck = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const {
        currentDeck,
        fetchDeckById,
        createDeck,
        updateDeck,
        createCard,
        updateCard,
        deleteCard
    } = useFlashcardStore();

    const [deckInfo, setDeckInfo] = useState({ title: '', description: '' });
    const [newCard, setNewCard] = useState({ front: '', back: '' });
    const [editingCard, setEditingCard] = useState(null);

    const isNewDeck = deckId === 'new';

    useEffect(() => {
        if (!isNewDeck) {
            fetchDeckById(deckId);
        }
    }, [deckId, fetchDeckById, isNewDeck]);

    useEffect(() => {
        if (currentDeck && !isNewDeck) {
            setDeckInfo({ title: currentDeck.title, description: currentDeck.description });
        }
    }, [currentDeck, isNewDeck]);

    const handleDeckChange = (e) => {
        const { name, value } = e.target;
        setDeckInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleDeckSubmit = async (e) => {
        e.preventDefault();
        if (isNewDeck) {
            const result = await createDeck(deckInfo);
            if (result.success) {
                navigate(`/decks/${result.data._id}/edit`);
            }
        } else {
            await updateDeck(deckId, deckInfo);
        }
    };
    
    const handleNewCardChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        if (!newCard.front || !newCard.back) return;
        await createCard(deckId, newCard);
        setNewCard({ front: '', back: '' });
    };

    const handleUpdateCard = async (e) => {
        e.preventDefault();
        if (!editingCard || !editingCard.front || !editingCard.back) return;
        await updateCard(deckId, editingCard._id, { front: editingCard.front, back: editingCard.back });
        setEditingCard(null);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{isNewDeck ? 'Criar Nova Coleção' : 'Editar Coleção'}</h1>

            <form onSubmit={handleDeckSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título</label>
                    <input type="text" name="title" value={deckInfo.title} onChange={handleDeckChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descrição</label>
                    <textarea name="description" value={deckInfo.description} onChange={handleDeckChange} className="w-full p-2 border rounded" rows="3"></textarea>
                </div>
                <button type="submit" className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition flex items-center gap-2 cursor-pointer">
                    <FaSave /> {isNewDeck ? 'Criar e Continuar' : 'Salvar Alterações da Coleção'}
                </button>
            </form>

            {!isNewDeck && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Cartões</h2>
                    {/* Formulário para Adicionar/Editar Cartão */}
                    <form onSubmit={editingCard ? handleUpdateCard : handleAddCard} className="bg-white p-6 rounded-lg shadow-md mb-8">
                         <h3 className="text-xl font-bold mb-2">{editingCard ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</h3>
                        <div className="flex gap-4 mb-4">
                            <textarea name="front" placeholder="Frente" value={editingCard ? editingCard.front : newCard.front} onChange={editingCard ? (e) => setEditingCard({...editingCard, front: e.target.value}) : handleNewCardChange} className="w-1/2 p-2 border rounded" required />
                            <textarea name="back" placeholder="Verso" value={editingCard ? editingCard.back : newCard.back} onChange={editingCard ? (e) => setEditingCard({...editingCard, back: e.target.value}) : handleNewCardChange} className="w-1/2 p-2 border rounded" required />
                        </div>
                        <div className="flex gap-2">
                             <button type="submit" className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition flex items-center gap-2 cursor-pointer">
                                {editingCard ? <FaSave /> : <FaPlus />} {editingCard ? 'Salvar Cartão' : 'Adicionar Cartão'}
                            </button>
                            {editingCard && <button type="button" onClick={() => setEditingCard(null)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Cancelar Edição</button>}
                        </div>
                    </form>

                    {/* Lista de Cartões */}
                    <div className="space-y-4">
                        {currentDeck?.cards.map(card => (
                            <div key={card._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div className="w-1/2 pr-2">
                                    <p className="font-semibold">Frente</p>
                                    <p>{card.front}</p>
                                </div>
                                <div className="w-1/2 pl-2 border-l">
                                    <p className="font-semibold">Verso</p>
                                    <p>{card.back}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingCard({...card})} className="p-2 text-blue-500 hover:text-blue-700"><FaEdit /></button>
                                    <button onClick={() => deleteCard(deckId, card._id)} className="p-2 text-red-500 hover:text-red-700"><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditDeck;