const allowedUsers = [
    { username: 'sebastiao', password: '123' },
    { username: 'analice', password: '321' },
    { username: 'clara', password: '456' },
    { username: 'lucas', password: '654' },
    { username: 'marina', password: '789' },
    { username: 'ruana', password: '987' }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const isValidUser = allowedUsers.some(user => 
        user.username === username && user.password === password
    );
    
    if(isValidUser) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', username);
        console.log(`Usuário logado: ${username}`);
        window.location.href = 'tasks.html';
    } else {
        alert('Credenciais inválidas!');
    }
});