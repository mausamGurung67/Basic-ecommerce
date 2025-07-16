import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import LoginForm from './components/auth/Login'
import Register from './components/auth/Register'
import OTPVerification from './components/auth/OtpVerification'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/otp-verify" element={<OTPVerification/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
