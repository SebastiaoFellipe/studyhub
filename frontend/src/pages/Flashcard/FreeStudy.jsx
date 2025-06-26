import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFlashcardStore } from '../../store/flashcardStore';
import { FaArrowLeft, FaArrowRight, FaSync } from 'react-icons/fa';

const FreeStudy = () => {
    const { deckId } = useParams();
    const { currentDeck, fetchDeckById, loading, error } = useFlashcardStore();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (deckId) {
            fetchDeckById(deckId);
        }
    }, [deckId, fetchDeckById]);

    // Usamos useMemo para evitar recálculos desnecessários do array de cartões
    const cards = useMemo(() => currentDeck?.cards || [], [currentDeck]);

    if (loading) return <p className="text-center mt-10">Carregando deck para revisão...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    if (!currentDeck || cards.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Nenhum Cartão Encontrado</h2>
                <p className="text-gray-600 mb-6">Este deck está vazio. Adicione alguns cartões para começar a revisar.</p>
                <Link to={`/decks/${deckId}/edit`} className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition">
                    Adicionar Cartões
                </Link>
            </div>
        );
    }

    const card = cards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2">{currentDeck.title}</h1>
            <p className="text-gray-500 mb-6">(Modo de Revisão Livre)</p>

            <div className="w-full max-w-2xl h-80 perspective-1000">
                <div
                    className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className="absolute w-full h-full backface-hidden bg-white shadow-lg rounded-lg flex items-center justify-center p-6 text-2xl text-center cursor-pointer">
                        {card.front}
                    </div>
                    <div className="absolute w-full h-full backface-hidden bg-gray-100 shadow-lg rounded-lg flex items-center justify-center p-6 text-2xl text-center cursor-pointer rotate-y-180">
                        {card.back}
                    </div>
                </div>
            </div>

            <div className="mt-6 text-lg">
                <p>Cartão {currentIndex + 1} de {cards.length}</p>
            </div>

            <div className="flex gap-4 mt-4">
                <button onClick={handlePrev} className="p-4 bg-secondary text-white rounded-full hover:bg-primary transition" title="Anterior">
                    <FaArrowLeft />
                </button>
                <button onClick={() => setIsFlipped(!isFlipped)} className="p-4 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition" title="Virar Cartão">
                    <FaSync />
                </button>
                <button onClick={handleNext} className="p-4 bg-secondary text-white rounded-full hover:bg-primary transition" title="Próximo">
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default FreeStudy;