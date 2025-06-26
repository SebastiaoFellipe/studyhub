import { Link, NavLink, useNavigate } from "react-router-dom";
import { GrBook } from "react-icons/gr";
import { useUserStore } from '../store/userStore';

const Navbar = () => {
    const { isAuthenticated, logout } = useUserStore();
    const navigate = useNavigate();

    const linkClasses = ({ isActive }) =>
        isActive ? "underline" : "hover:underline";
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="bg-[var(--color-primary)] text-[var(--color-background)] p-5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-1">
                    <GrBook className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">StudyHub</h2>
                </Link>
                <ul className="flex space-x-6 items-center">
                    <li>
                        <NavLink to="/pomodoro" className={linkClasses}>
                            Pomodoro
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/flashcards" className={linkClasses}>
                            Flashcards
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" className={linkClasses}>
                            Anotações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={linkClasses}>
                            Sobre
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <li>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Sair
                            </button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" className={linkClasses}>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;