# StudyHub: Sua Central de Estudos Inteligente

## Sobre o Projeto

O StudyHub é uma aplicação web completa, desenvolvida com a stack MERN, projetada para ser a central definitiva de ferramentas para estudantes. A plataforma integra técnicas de aprendizado e organização comprovadamente eficazes, como a Técnica Pomodoro, Flashcards com Repetição Espaçada (SRS) e um sistema de anotações robusto.

A missão do StudyHub é simples: centralizar e otimizar a jornada de aprendizado, eliminando a necessidade de alternar entre múltiplos aplicativos e fornecendo um ambiente integrado, flexível e focado na produtividade do estudante.

## Funcionalidades Principais

- **Pomodoro & Gerenciamento de Tarefas:** Utilize a Técnica Pomodoro para manter o foco e gerencie suas atividades em uma lista de tarefas integrada, separando o que está pendente do que já foi concluído.
- **Flashcards com Repetição Espaçada (SRS):** Crie e organize decks de flashcards para memorização de longo prazo. O sistema utiliza um algoritmo de repetição espaçada para agendar as revisões nos momentos mais eficientes, garantindo que você retenha o conhecimento. Oferece também um modo de "Revisão Livre" para estudo sem o algoritmo.
- **Anotações com Editor de Rich Text:** Crie anotações detalhadas e bem estruturadas com um editor de texto avançado (baseado em Tiptap), que suporta títulos, listas, citações e outras formatações essenciais para organizar suas ideias.
- **Autenticação de Usuários:** Sistema seguro de cadastro e login para garantir que todos os seus dados de estudo sejam privados e acessíveis apenas por você.

## Tecnologias Utilizadas

O projeto foi construído utilizando a stack MERN e outras tecnologias modernas do ecossistema JavaScript.
### Frontend

- [React](https://react.dev/): Biblioteca principal para a construção da interface de usuário.
- [Vite](https://vite.dev/): Ferramenta de build e desenvolvimento local de alta performance.
- [Zustand](https://zustand-demo.pmnd.rs/): Gerenciador de estado simples e poderoso.
- [React Router DOM](https://reactrouter.com/): Para gerenciamento de rotas e navegação na aplicação.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS para estilização rápida e responsiva.
- [Axios](https://axios-http.com/): Cliente HTTP para realizar requisições ao backend.
- [Tiptap](https://tiptap.dev/): Framework de editor de texto "headless" para a funcionalidade de anotações.
- [React Icons](https://react-icons.github.io/react-icons/): Biblioteca para inclusão de ícones.

### Backend

- [Node.js](https://nodejs.org/pt) e [Express.js](https://expressjs.com/pt-br/): Plataforma e framework para a construção de uma API RESTful eficiente e organizada.
- [Mongoose](https://mongoosejs.com/): ODM (Object Data Modeling) para modelagem e interação com o banco de dados MongoDB de forma estruturada e assíncrona.
- [JSON Web Token (JWT)](https://jwt.io/): Utilizado para a implementação de um sistema de autenticação stateless e seguro, garantindo a proteção das rotas.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Para a criptografia de senhas, seguindo as melhores práticas de segurança ao não armazenar senhas em texto plano.

### Banco de Dados

- [MongoDB](https://www.mongodb.com/): Banco de dados NoSQL orientado a documentos, utilizado para persistir todos os dados da aplicação.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/pt) (recomenda-se a versão LTS mais recente)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (os exemplos usarão npm)
- [MongoDB](https://www.mongodb.com/) (instância local ou um serviço de nuvem como o MongoDB Atlas)

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

1. Clone o repositório:
```bash
git clone https://github.com/sebastiaofellipe/studyhub.git
cd studyhub
```

2. Configuração do Backend:
- Navegue até a pasta do backend:
```bash
cd backend
```

- Crie um arquivo `.env` na raiz da pasta backend e adicione as seguintes variáveis de ambiente, substituindo os valores conforme necessário:
```bash
# .env

# Porta em que o servidor backend será executado
PORT=5000

# String de conexão do seu banco de dados MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/studyhub

# Chave secreta para gerar os tokens JWT. Use um valor longo e aleatório.
JWT_SECRET=sua_chave_secreta_super_segura_aqui
```

- Instale as dependências do backend:
```bash
npm install
```

- Inicie o servidor de desenvolvimento do backend:
```bash
npm run dev
```

- O servidor backend estará em execução em http://localhost:5000.

3. Configuração do Frontend:

- Em um novo terminal, navegue até a pasta do frontend:
```bash
# Se você estiver na pasta 'backend', volte para a raiz primeiro
cd ../frontend 
```

- Instale as dependências do frontend:
```bash
npm install
```

- Inicie o servidor de desenvolvimento do frontend:
```bash
npm run dev
```

- O Vite irá iniciar o servidor de desenvolvimento (geralmente em http://localhost:5173) e o frontend da aplicação estará acessível no seu navegador. As requisições para /api serão automaticamente redirecionadas para o backend na porta 5000, conforme configurado no vite.config.js.

## Autor

- [@SebastiaoFellipe](https://github.com/SebastiaoFellipe)
