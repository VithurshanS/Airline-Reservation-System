
// import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/Navbar';
// import entrypic from '../../assets/entrypic.jpg';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="hero-image">
      <div className="hero-text">
        <h1>Welcome to our Airlines!</h1>
        <p>I time to travel</p>
        <button onClick={() => navigate("/Home")}>
          Home Page
        </button>
      </div>
    </div>
    </>
  );
}

export default Entry;