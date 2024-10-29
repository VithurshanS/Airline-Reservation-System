
// import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/Navbar';
// import entrypic from '../../assets/entrypic.jpg';
import './entry.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Entry = () => {
  const navigate = useNavigate();

  return (
    
    <>
    <Navbar/>
    <div className="hero-image">
      <div className="hero-text">
        <h1 className='hero-text-h1'>Welcome to our B Airways!</h1>
        <p className='hero-text-p1'>It's time to travel</p>
        {/* <button className='homebutton' onClick={() => navigate("/Home")}>
          Home Page
        </button> */}
        <Button variant="contained" className='homebutton' onClick={() => navigate("/Home")}> Home Page</Button>
      </div>
    </div>
    
    </>
  );
}

export default Entry;