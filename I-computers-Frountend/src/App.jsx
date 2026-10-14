import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import AdminPage from './pages/adminPage'
import Testpage from './test'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/test" element={<Testpage />} />
    </Routes>
  )
}

export default App