
import Login from './pages/Login'
import './App.css'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
