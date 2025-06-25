import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa6';
import InputField from '../../components/InputField';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    console.log('SignUp submitted:', { name, email, password, confirmPassword, acceptedTerms });
  };

  return (
    <div className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--color-dark)]">Crie sua Conta</h3>
        <p className="text-gray-600 mt-2">Por favor, digite seus dados para se cadastrar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nome completo"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          Icon={FaUser}
          required
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu.email@exemplo.com"
          Icon={FaEnvelope}
          required
        />

        <InputField
          label="Senha"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          Icon={FaLock}
          required
        />

        <InputField
          label="Confirme sua senha"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          Icon={FaLock}
          required
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              className="focus:ring-[var(--color-primary)] h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              Eu concordo com os{' '}
              <a href="#" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)]">
                Termos e Condições
              </a>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-secondary)] transition cursor-pointer"
          >
            Cadastrar
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?
          <Link to="/login" className="font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] ml-1">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;