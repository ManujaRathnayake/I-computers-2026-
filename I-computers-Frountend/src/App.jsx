import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import AdminPage from './pages/adminPage'
import Testpage from './test'
import LoginPage from './pages/loginpage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
    <Toaster position='top-center'/> 
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/test" element={<Testpage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </div>
  )
}

export default App