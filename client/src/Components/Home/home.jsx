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

import { Link } from 'react-router-dom';

//import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import AdDashboard from '../Adminpage/AdDashboard/AdDashboard';
//import Dashboard from '../Userpage/Dashboard/Dashboard'
function Home() {
  const Navigate = useNavigate();
  return (
    <div>
      {/* <div className="button-container">
       
        <button className="Homebuttons" onClick={() => Navigate("/")}>
          ← Back
        </button>


        <button className="Homebuttons" onClick={() => Navigate("/Login")}>
          Next →
        </button>
      </div> */}

      <Navbar2/>
      <Hero/>
      <About/>
      <Services/>
      <MyWork/>
      <Contact/>
      <Footer/>

      
    </div>
  );
}

export default Home;
