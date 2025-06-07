import { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', id: null });
  const [isEditing, setIsEditing] = useState(false);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks'); // Ajuste a porta conforme necessário
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Efeito para buscar tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para criar ou atualizar tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task); // Ajuste a porta conforme necessário
    } else {
      await axios.post('http://localhost:5000/api/tasks', task); // Ajuste a porta conforme necessário
    }
    setTask({ title: '', id: null });
    setIsEditing(false);
    fetchTasks();
  };

  // Função para editar tarefa
  const handleEdit = (task) => {
    setTask({ title: task.title, id: task._id });
    setIsEditing(true);
  };

  // Função para deletar tarefa
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`); // Ajuste a porta conforme necessário
    fetchTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Task Title"
          required
        />
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;