// import React from 'react';
// import Userpage from '../Userpage/Userpage'; // Make sure the path is correct based on your folder structure

//import Navbar from "../../assets/Navbar";

//import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import AdDashboard from '../Adminpage/AdDashboard/AdDashboard';
//import Dashboard from '../Userpage/Dashboard/Dashboard'
function Home() {
  return (
    <div>
      {/* <Navbar/>
      This is the Home page 
      <h1>efefsfff</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
         Ducimus tenetur sapiente ullam commodi placeat maiores amet. 
         Voluptatem, blanditiis eligendi amet dolorem molestias ea eveniet qui aliquid ut sint hic at?
      </p> */}
      
       <AdDashboard/>
      {/* Render the Userpage component */}
      {/* <Userpage /> */}
    </div>
  );
}

export default Home;
