import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </>
  )
}

export default App
