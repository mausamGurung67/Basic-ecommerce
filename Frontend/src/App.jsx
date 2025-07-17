import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import LoginForm from './components/auth/Login'
import Register from './components/auth/Register'
import VerifyOtp from './components/auth/VerifyOtp'
import ForgotPassword from './components/auth/ForgotPassword'
import Navbar from './components/common/Navbar'
import Home from './components/auth/Home'
import ResetPassword from './components/auth/ResetPassword'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/otp-verify" element={<VerifyOtp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
