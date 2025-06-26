import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import InputField from '../../components/InputField';
import { FaEnvelope, FaLock } from 'react-icons/fa6';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login, loading } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpa erros anteriores
        const result = await login({ email, password });

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="w-full max-w-md p-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Entrar</h3>
                <p className="text-gray-600 mt-2">
                    Por favor, digite seus dados para fazer login
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Email" id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com" Icon={FaEnvelope} required
                />
                 <InputField
                  label="Senha" id="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" Icon={FaLock} required
                />
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition hover:cursor-pointer disabled:bg-gray-400"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Não tem uma conta?
                    <Link
                        to="/signup"
                        className="font-medium text-secondary hover:text-primary ml-1"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;