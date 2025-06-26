import { useEffect } from 'react';
import { useFlashcardStore } from '../../store/flashcardStore';
import { Link } from 'react-router-dom';
import { FaPlus, FaBookOpen, FaEdit, FaTrash, FaStreetView } from 'react-icons/fa';

const Decks = () => {
    const { decks, fetchDecks, deleteDeck, loading, error } = useFlashcardStore();

    useEffect(() => {
        fetchDecks();
    }, [fetchDecks]);

    const handleDelete = (deckId) => {
        if (window.confirm('Tem certeza que deseja apagar este deck e todos os seus cartões?')) {
            deleteDeck(deckId);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Meus Decks de Flashcards</h1>
                <Link to="/decks/new/edit" className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition flex items-center gap-2">
                    <FaPlus /> Criar Novo Deck
                </Link>
            </div>

            {loading && <p>Carregando decks...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map((deck) => (
                    <div key={deck._id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{deck.title}</h2>
                            <p className="text-gray-600 mb-4">{deck.description || 'Sem descrição.'}</p>
                            <p className="text-sm text-gray-500">{deck.cards.length} cartão(ões)</p>
                        </div>
                        {/* BOTÕES DE AÇÃO */}
                        <div className="flex justify-between items-center mt-4">
                             {/* Botões de Estudo */}
                            <div className="flex gap-2">
                                <Link to={`/decks/${deck._id}/study`} title="Estudo Inteligente (SRS)" className="flex items-center gap-2 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition">
                                    <FaBookOpen /> Estudar
                                </Link>
                                {/* NOVO BOTÃO DE REVISÃO LIVRE */}
                                <Link to={`/decks/${deck._id}/free-study`} title="Revisão Livre" className="flex items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    <FaStreetView />
                                </Link>
                            </div>
                             {/* Botões de Edição/Exclusão */}
                            <div className="flex gap-2">
                                <Link to={`/decks/${deck._id}/edit`} title="Editar Deck" className="p-3 text-gray-600 hover:text-primary transition"><FaEdit size={18} /></Link>
                                <button onClick={() => handleDelete(deck._id)} title="Deletar Deck" className="p-3 text-gray-600 hover:text-red-500 transition"><FaTrash size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && decks.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Você ainda não tem decks. Que tal criar um?</p>
                </div>
            )}
        </div>
    );
};

export default Decks;