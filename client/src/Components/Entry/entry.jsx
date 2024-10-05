
import React from 'react'
import { useNavigate } from 'react-router-dom';
import entrypic from '../../assets/entrypic.jpg';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1>Welcome to our Airlines!</h1>
        <p>It's time to travel</p>
        <button onClick={() => navigate("/Home")}>
          Home Page
        </button>
      </div>
    </div>
  );
}

export default Entry;