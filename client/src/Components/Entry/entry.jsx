import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/Navbar';
import './entry.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Entry = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user data from localStorage if it exists
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      console.log("User data removed from localStorage.");
    }
  }, []); // Empty dependency array ensures this runs only once when component mounts

  return (
    <>
      <Navbar />
      <div className="hero-image">
        <div className="hero-text">
          <h1 className='hero-text-h1'>Welcome to our B Airways!</h1>
          <p className='hero-text-p1'>It's time to travel</p>
          <Button variant="contained" className='homebutton' onClick={() => navigate("/Home")}> Home Page</Button>
        </div>
      </div>
    </>
  );
}

export default Entry;
