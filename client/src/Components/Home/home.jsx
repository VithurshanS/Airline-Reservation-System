import React from 'react'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import About from '../About/About'
import Services from '../Services/Services'
import MyWork from '../MyWork/MyWork'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'
import './Home.css'
=======
>>>>>>> 150c0a54fe788b8463b3d53fc13ce7bc8615b7a0
import { Link } from 'react-router-dom';

function Home() {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="button-container">
       
        <button onClick={() => Navigate("/")}>
          ← Back
        </button>

        <button onClick={() => Navigate("/Booking")}>
          Book Now
        </button>

        <button onClick={() => Navigate("/Login")}>
          Next →
        </button>
      </div>

      <Navbar2/>
      <Hero/>
      <About/>
      <Services/>
      <MyWork/>
      <Contact/>
      <Footer/>

      home page
      {/* <button className="btn-booknow" >Book Now </button> */}
      <Link to='/bookingpage' >
                <button className="bookingpage-button" >
                  TO Book
                  </button>
                  </Link>
    </div>
  )
}

export default Home;


