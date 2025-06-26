import { FaEdit, FaTrash } from 'react-icons/fa';
import { useTaskStore } from '../../store/taskStore';

const TaskItem = ({ task, onEdit }) => {
    const { toggleTaskCompletion, deleteTask } = useTaskStore();

    const handleToggle = () => {
        toggleTaskCompletion(task._id, !task.isCompleted);
    };

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
            deleteTask(task._id);
        }
    };

    const handleEditClick = () => {
        if (typeof onEdit === 'function') {
            onEdit(task);
        } else {
            console.error("A prop 'onEdit' não foi fornecida ou não é uma função.", { task });
        }
    }

    return (
        <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={handleToggle}
                    className="h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                />
                <span className={`ml-3 break-all mr-2 ${task.isCompleted ? 'line-through text-gray-400' : 'text-[var(--color-dark)]'}`}>
                    {task.title}
                </span>
            </div>
            {!task.isCompleted && (
                 <div className="flex gap-3 flex-shrink-0">
                    <button onClick={handleEditClick} className="text-gray-400 hover:text-[var(--color-primary)] cursor-pointer"><FaEdit /></button>
                    <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 cursor-pointer"><FaTrash /></button>
                </div>
            )}
        </li>
    );
};

export default TaskItem;