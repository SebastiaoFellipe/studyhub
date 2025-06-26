import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import NotesList from "./pages/Notes/NotesList";
import NoteView from "./pages/Notes/NoteView";
import NoteEditor from "./pages/Notes/NoteEditor";
import About from "./pages/About";
import Decks from "./pages/Flashcard/Decks";
import EditDeck from "./pages/Flashcard/EditDeck";
import StudyDeck from "./pages/Flashcard/StudyDeck";
import FreeStudy from "./pages/Flashcard/FreeStudy";
import NotFound from "./pages/NotFound";

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
                path="/decks"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Decks />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/decks/:deckId/edit"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <EditDeck />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/decks/:deckId/study"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <StudyDeck />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/decks/:deckId/free-study"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <FreeStudy />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notes"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <NotesList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notes/new"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <NoteEditor />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notes/:noteId"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <NoteView />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notes/:noteId/edit"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <NoteEditor />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
