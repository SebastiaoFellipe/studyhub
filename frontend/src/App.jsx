import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Flashcards from "./pages/Flashcards";
import Notes from "./pages/Notes";
import About from "./pages/About";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />
            <Route
                path="/about"
                element={
                    <MainLayout>
                        <About />
                    </MainLayout>
                }
            />
            <Route
                path="/login"
                element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="/signup"
                element={
                    <AuthLayout>
                        <SignUp />
                    </AuthLayout>
                }
            />
            <Route
                path="/pomodoro"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Pomodoro />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flashcards"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Flashcards />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notes"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Notes />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
