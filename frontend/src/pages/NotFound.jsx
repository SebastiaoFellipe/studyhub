import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-20">
      <h1 className="text-9xl font-extrabold text-secondary tracking-widest">404</h1>
      <div className="text-primary px-2 text-6xl font-bold">
        Página Não Encontrada
      </div>
      <p className="mt-4 text-lg text-gray-600">
        Oops! A página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFound;