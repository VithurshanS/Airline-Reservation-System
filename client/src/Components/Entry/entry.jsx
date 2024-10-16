
import React from 'react'
import { useNavigate } from 'react-router-dom';
import entrypic from '../../assets/entrypic.jpg';
import './entry.css'

const Entry = () => {
  const navigate = useNavigate();

  return (
    
    <div className="hero-image">
      <div className="hero-text">
        <h1  class="gradient-text">Welcome to our Airline!</h1>
        <p  style={{ color: "black" }}>It's time to travel</p>
        <button onClick={() => navigate('/Home')}>Home Page</button> {/* Navigates to Home */}
        
      </div>
    </div>
    
  );
}

export default Entry;