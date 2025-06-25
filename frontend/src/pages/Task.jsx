import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore.js';

const Task = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const error = useTaskStore((state) => state.error);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const createTask = useTaskStore((state) => state.createTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [taskInput, setTaskInput] = useState({ title: '', id: null });
  const [isEditing, setIsEditing] = useState(false);

  // Efeito para buscar tarefas ao montar o componente, usando a ação da store
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Função para criar ou atualizar tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isEditing) {
      result = await updateTask(taskInput.id, { title: taskInput.title });
    } else {
      result = await createTask({ title: taskInput.title });
    }

    if (result.success) {
        setTaskInput({ title: '', id: null });
        setIsEditing(false);
    } else {
        alert(result.message);
    }
  };

  // Função para editar tarefa
  const handleEdit = (task) => {
    setTaskInput({ title: task.title, id: task._id });
    setIsEditing(true);
  };

  // Função para deletar tarefa
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
        const result = await deleteTask(id);
        if (!result.success) {
            alert(result.message);
        }
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskInput.title}
          onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
          placeholder="Task Title"
          required
        />
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {isEditing && (
            <button type="button" onClick={() => {
                setTaskInput({ title: '', id: null });
                setIsEditing(false);
            }}>Cancel Edit</button>
        )}
      </form>
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title}
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Task;