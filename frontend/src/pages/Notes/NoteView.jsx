import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const NoteView = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { currentNote, fetchNoteById, deleteNote, loading, error, clearCurrentNote } = useNoteStore();

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        editable: false, // Modo somente leitura
    });

    useEffect(() => {
        fetchNoteById(noteId);
        return () => {
            clearCurrentNote(); // Limpa a nota ao desmontar o componente
        }
    }, [noteId, fetchNoteById, clearCurrentNote]);
    
    useEffect(() => {
        if (currentNote && editor) {
            editor.commands.setContent(currentNote.content);
        }
    }, [currentNote, editor]);
    
    const handleDelete = async () => {
        if (window.confirm("Tem certeza de que deseja excluir esta anotação?")) {
            const result = await deleteNote(noteId);
            if(result.success) {
                navigate('/notes');
            }
        }
    }

    if (loading || !editor) return <p className="text-center mt-10">Carregando...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!currentNote) return <p className="text-center mt-10">Anotação não encontrada.</p>

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                     <Link to="/notes" className="text-secondary hover:text-primary flex items-center gap-2 mb-4">
                        <FaArrowLeft /> Voltar para a lista
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-800">{currentNote.title}</h1>
                </div>
                <div className="flex gap-2">
                    <Link to={`/notes/${noteId}/edit`} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                        <FaEdit /> Editar
                    </Link>
                     <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                        <FaTrash /> Excluir
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-inner">
                 <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default NoteView;