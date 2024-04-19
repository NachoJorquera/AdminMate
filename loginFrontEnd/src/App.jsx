import React from 'react'
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

//<Route path='/' element={<Home />}></Route>