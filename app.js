const express = require('express');
const path = require('path');
const app = express();

// Serve todos os arquivos da raiz como estáticos
app.use(express.static(__dirname));

// Redireciona rota principal para index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});