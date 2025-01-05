import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Transaksi from './pages/Transaksi'
import Profil from './pages/Profil'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/transaksi' element={<Transaksi />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
