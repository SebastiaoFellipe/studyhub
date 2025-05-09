(function checkAuth() {
    if(!localStorage.getItem('isAuthenticated')) {
        window.location.href = 'login.html';
    }
})();

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-all');
const userPanel = document.querySelector('.user-panel .user');
const taskCount = document.getElementById('task-count');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateUserPanel() {
    const username = localStorage.getItem('currentUser') || 'Usuário';
    if(userPanel) {
        userPanel.textContent = `Olá, ${username}`;
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = '';
    if (tasks.length === 0) {
        taskCount.textContent = "Nenhuma tarefa criada";
    } else {
        taskCount.textContent = `Você tem ${tasks.length} tarefa${tasks.length !== 1 ? 's' : ''}`;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = task;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => {
            const newText = prompt('Editar tarefa:', task);
            if (newText !== null && newText.trim() !== '') {
                tasks[index] = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        tasks.unshift(text);
        saveTasks();
        renderTasks();
        input.value = '';
    }
});

clearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir todas as tarefas?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

window.logout = function() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    console.log('Usuário desconectado');
    window.location.href = 'index.html';
}

updateUserPanel();
renderTasks();