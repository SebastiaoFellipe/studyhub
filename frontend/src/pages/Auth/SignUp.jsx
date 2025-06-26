import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa6';
import { useUserStore } from '../../store/userStore';
import InputField from '../../components/InputField';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    // Validação de senha no frontend
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 8) {
        setError('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    const result = await register({ name, email, password });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message); // Exibe o erro retornado pela API (via store)
    }
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
          placeholder="Mínimo de 8 caracteres"
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-secondary)] transition cursor-pointer disabled:bg-gray-400"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
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