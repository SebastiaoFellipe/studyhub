import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/pomodoro" element={<MainLayout><Pomodoro /></MainLayout>} />
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
    </Routes>
  );
}

export default App;