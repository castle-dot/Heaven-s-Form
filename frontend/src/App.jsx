import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import Confession from './pages/Confession'
import SoulProfile from './pages/SoulProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/confession" element={<Confession />} />
        <Route path="/souls/:id" element={<SoulProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App