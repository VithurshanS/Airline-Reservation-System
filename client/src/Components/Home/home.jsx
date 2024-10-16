import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import About from '../About/About'
import Services from '../Services/Services'
import MyWork from '../MyWork/MyWork'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'
import './Home.css'

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

    </div>
  )
}

export default Home;


