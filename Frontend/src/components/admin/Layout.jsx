import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Sidebar/>
        <Navbar/>

        <Outlet/>
    </div>
  )
}

export default Layout