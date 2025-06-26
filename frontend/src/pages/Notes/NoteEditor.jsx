import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import TiptapEditor from '../../components/NotesEditor/TiptapEditor';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const NoteEditor = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { currentNote, fetchNoteById, createNote, updateNote, loading, clearCurrentNote } = useNoteStore();
    
    const isNewNote = !noteId;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!isNewNote) {
            fetchNoteById(noteId);
        }
        return () => {
            clearCurrentNote();
        }
    }, [noteId, isNewNote, fetchNoteById, clearCurrentNote]);

    useEffect(() => {
        if (currentNote && !isNewNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        }
    }, [currentNote, isNewNote]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("O título é obrigatório.");
            return;
        }

        const noteData = { title, content };
        let result;

        if (isNewNote) {
            result = await createNote(noteData);
        } else {
            result = await updateNote(noteId, noteData);
        }

        if (result.success) {
            navigate(`/notes/${result.data._id}`);
        }
    };

    const handleContentUpdate = useCallback((newContent) => {
        setContent(newContent);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold">{isNewNote ? 'Nova Anotação' : 'Editando Anotação'}</h1>
                 <button onClick={handleSave} disabled={loading} className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary transition flex items-center gap-2 disabled:bg-gray-400">
                    <FaSave /> {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </div>

            <div className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da sua anotação..."
                    className="w-full text-2xl font-bold p-2 border-b-2 focus:outline-none focus:border-secondary"
                />
                <TiptapEditor
                    content={content}
                    onUpdate={handleContentUpdate}
                    placeholder="Comece a escrever aqui..."
                />
            </div>
             <Link to={isNewNote ? "/notes" : `/notes/${noteId}`} className="text-secondary hover:text-primary flex items-center gap-2 mt-4">
                <FaArrowLeft /> Voltar
            </Link>
        </div>
    );
};

export default NoteEditor;