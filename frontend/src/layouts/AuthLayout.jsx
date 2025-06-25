import LoginImage from "../assets/images/login-mulher-celular.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Link to="/" className="text-2xl absolute top-2 right-2 p-4 bg-white rounded-xl"><FaArrowLeftLong /></Link>
            <div className="w-full md:max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[650px] items-stretch">
                {/* Formulário */}
                <div className="w-full md:w-1/2 flex items-center md:items-start justify-center">
                    {children}
                </div>

                {/* Imagem */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={LoginImage}
                        alt="Mulher colocando a senha no celular"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
