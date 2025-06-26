// frontend/src/pages/Flashcard/StudyDeck.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFlashcardStore } from '../../store/flashcardStore';
import { FaCheck, FaTimes, FaSync } from 'react-icons/fa';

const StudyDeck = () => {
    const { deckId } = useParams();
    const { 
        cardsToReview, 
        fetchCardsToReview, 
        reviewCard, 
        loading, 
        error 
    } = useFlashcardStore();
    
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionFinished, setSessionFinished] = useState(false);

    useEffect(() => {
        fetchCardsToReview(deckId);
    }, [deckId, fetchCardsToReview]);

    const handleReview = async (wasCorrect) => {
        if (cardsToReview.length === 0) return;
        const currentCard = cardsToReview[0];
        
        await reviewCard(deckId, currentCard._id, wasCorrect);
        
        setIsFlipped(false);

        if (cardsToReview.length <= 1) { // Verifica se era o último cartão
            setSessionFinished(true);
        }
    };

    if (loading) return <p className="text-center mt-10">Carregando cartões para revisão...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    if (sessionFinished || cardsToReview.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Sessão de Estudo Concluída!</h2>
                <p className="text-gray-600 mb-6">Você revisou todos os cartões que estavam pendentes. Bom trabalho!</p>
                <Link to="/decks" className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition">
                    Voltar para Meus Decks
                </Link>
            </div>
        );
    }
    
    const currentCard = cardsToReview[0];

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2">Sessão de Estudo</h1>
            <p className="text-gray-600 mb-6">Cartões restantes: {cardsToReview.length}</p>

            <div className="w-full max-w-2xl h-80 perspective-1000">
                <div
                    className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Frente do Cartão */}
                    <div className="absolute w-full h-full backface-hidden bg-white shadow-lg rounded-lg flex items-center justify-center p-6 text-2xl text-center cursor-pointer">
                        {currentCard.front}
                    </div>
                    {/* Verso do Cartão */}
                    <div className="absolute w-full h-full backface-hidden bg-gray-100 shadow-lg rounded-lg flex items-center justify-center p-6 text-2xl text-center cursor-pointer rotate-y-180">
                        {currentCard.back}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                {!isFlipped ? (
                    <button onClick={() => setIsFlipped(true)} className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-primary transition flex items-center gap-2">
                        <FaSync /> Mostrar Resposta
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={() => handleReview(false)} className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex flex-col items-center gap-1">
                            <FaTimes size={20}/>
                            <span>Errei</span>
                        </button>
                        <button onClick={() => handleReview(true)} className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex flex-col items-center gap-1">
                            <FaCheck size={20}/>
                           <span>Acertei</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyDeck;