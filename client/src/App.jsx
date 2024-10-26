import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import './App.css'
import { Routes, Route,  BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './assets/Navbar';
import Entry from './Components/Entry/entry';
import Home from './Components/Home/home';
import Booking from './Components/Booking/Booking';
import ScheduleEdit from './Components/ScheduleEdit/ScheduleEdit';
import PlaneDetails from './Components/PlaneDetails/PlaneDetails';



function App() {
  
  return (
    <div>
      
          
          
      <Router>
      {/* Navbar should stay outside the background image section */}
      <Navbar />

        {/* Main Content Area */}

          <Routes>

          {/* <Route
              path="/"
              element={
                <Entry/>
              }
            /> */}

          

            <Route path="/" element={<Entry/>}></Route>

            {/* <div className="min-h-screen"> */}
            {/* Apply background image only to login and signup pages */}
            <Route
              path="/login"
              element={
                <div className="bg-[url(./assets/SU.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
                  <Login />
                </div>
              }
            />
            <Route
              path="/signup"
              element={
                <div className="bg-[url(./assets/OIP.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
                  <Signup />
                </div>
              }
            />
            {/* </div> */}
          
            <Route path="/Home" element={<Home/>} /> {/* This is the route for the Home page */}

            <Route path="/Booking" element={<Booking/>} /> 

            <Route path="/ScheduleEdit" element={<ScheduleEdit/>} /> 

            <Route path="/PlaneDetails" element={<PlaneDetails/>} />

          </Routes>
          
          </Router>
      
    </div>
  );
}

export default App;
