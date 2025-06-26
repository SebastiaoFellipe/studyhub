import { useState, useEffect, useMemo } from 'react';
import { useTaskStore } from '../../store/taskStore';
import TaskItem from './TaskItem';

const TaskManager = () => {
    const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteAllTasks } = useTaskStore();
    const [taskInput, setTaskInput] = useState({ title: '', id: null });
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const pendingTasks = useMemo(() => tasks.filter(t => !t.isCompleted), [tasks]);
    const completedTasks = useMemo(() => tasks.filter(t => t.isCompleted), [tasks]);

    const showFeedback = (message, type) => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskInput.title.trim()) return;

        const result = isEditing
            ? await updateTask(taskInput.id, { title: taskInput.title })
            : await createTask({ title: taskInput.title });

        if (result.success) {
            showFeedback(`Tarefa ${isEditing ? 'atualizada' : 'adicionada'} com sucesso!`, 'success');
            setTaskInput({ title: '', id: null });
            setIsEditing(false);
        } else {
            showFeedback(result.message, 'error');
        }
    };
    
    const handleEdit = (task) => {
        setTaskInput({ title: task.title, id: task._id });
        setIsEditing(true);
        window.scrollTo(0, 0);
    };

    const handleCancelEdit = () => {
        setTaskInput({ title: '', id: null });
        setIsEditing(false);
    };

    const handleDeleteAll = () => {
        if (window.confirm("Tem certeza que deseja excluir TODAS as tarefas? Esta ação não pode ser desfeita.")) {
            deleteAllTasks();
        }
    };

    const TabButton = ({ tabName, label, count }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tabName 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {label} ({count})
        </button>
    );

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner h-full flex flex-col">
            <h2 className="text-2xl font-bold text-center text-[var(--color-dark)] mb-4">Minhas Tarefas</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    value={taskInput.title}
                    onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
                    placeholder={isEditing ? "Editando tarefa..." : "Adicionar uma nova tarefa..."}
                    required
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <div className="flex gap-2">
                    <button type="submit" disabled={loading} className="w-full sm:w-auto px-6 py-2 text-white bg-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-primary)] transition disabled:bg-gray-400">
                        {loading ? '...' : (isEditing ? 'Atualizar' : 'Adicionar')}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={handleCancelEdit} className="w-full sm:w-auto px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {feedback.message && (
                <div className={`p-2 mb-4 text-center rounded-lg ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {feedback.message}
                </div>
            )}
            
            <div className="border-b border-gray-200 mb-4">
                <nav className="flex space-x-2">
                    <TabButton tabName="pending" label="Pendentes" count={pendingTasks.length} />
                    <TabButton tabName="completed" label="Concluídas" count={completedTasks.length} />
                </nav>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <ul className="space-y-2">
                    {activeTab === 'pending' && (
                        pendingTasks.length > 0
                            ? pendingTasks.map(task => <TaskItem key={task._id} task={task} onEdit={handleEdit} />)
                            : !loading && <p className="text-center text-gray-500">Nenhuma tarefa pendente!</p>
                    )}
                    {activeTab === 'completed' && (
                        completedTasks.length > 0
                            ? completedTasks.map(task => <TaskItem key={task._id} task={task} onEdit={handleEdit} />)
                            : !loading && <p className="text-center text-gray-500">Nenhuma tarefa concluída ainda.</p>
                    )}
                    {loading && tasks.length === 0 && <p className="text-center text-gray-500">Carregando...</p>}
                </ul>
            </div>

            {tasks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button onClick={handleDeleteAll} disabled={loading} className="w-full text-sm text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-md transition disabled:text-gray-400">
                        Excluir todas as tarefas
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskManager;