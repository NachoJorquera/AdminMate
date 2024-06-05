import React from 'react'
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Deliveries from './pages/Deliveries'
import Parking from './pages/Parking'
import Visits from './pages/Visits'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/visits' element={<Visits />}></Route>
        <Route path='/deliveries' element={<Deliveries />}></Route>
        <Route path='/parking' element={<Parking />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App