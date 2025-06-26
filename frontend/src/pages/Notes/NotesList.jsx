import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { FaPlus, FaEye } from 'react-icons/fa';

const NotesList = () => {
    const { notes, fetchNotes, loading, error } = useNoteStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Minhas Anotações</h1>
                <Link to="/notes/new" className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition flex items-center gap-2">
                    <FaPlus /> Criar Nova Anotação
                </Link>
            </div>

            {loading && <p>Carregando anotações...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div key={note._id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between">
                        <h2 className="text-xl font-bold mb-2 truncate">{note.title}</h2>
                        <div className="flex justify-end mt-4">
                            <Link to={`/notes/${note._id}`} className="flex items-center gap-2 text-secondary hover:text-primary">
                                <FaEye /> Ver Completa
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && notes.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Você ainda não tem anotações.</p>
                </div>
            )}
        </div>
    );
};

export default NotesList;