import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Transaksi from './Pages/Transaksi'
import Profil from './Pages/Profil'
import Login from './Pages/Login'
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
