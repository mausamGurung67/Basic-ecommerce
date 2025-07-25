import React from 'react'
import { useEffect } from 'react';

const Home = () => {


  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    }
  },[]);
  return (

    <div>Home</div>
    
  )
}

export default Home