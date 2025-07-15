import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import LoginForm from './components/auth/Login'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
