
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import SeatDisplay from './Components/seatdisplay/SeatDisplay';
import "./App.css"
import { Routes, Route,  BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './assets/Navbar';


import Entry from './Components/Entry/entry';
import Home from './Components/Home/home';
import BookingPageMain from './Components/BookingPageMain/BookingPageMain';
import BookNowPage from './Components/BookingPageMain/BookNowPage/BookNowPage';

//

// function App() {
//   const Navigate=useNavigate();
//   return (
//     <div>
//       <BrowserRouter>
//       <Routes>
//       <Route path="/home" element={<home/>}></Route>
//       <div className="hero-image">
//       <div className="hero-text">
//         <h1>Welcome to our Airlines!</h1>
//         <p>It's time to travel</p> 
//         <button onClick={()=>Navigate("/home")}>
//         Home Page
//       </button>
//       </div>
//     </div>
    
//     </Routes>
//     </BrowserRouter>

//     <div>
//       <Router>
//       {/* Navbar should stay outside the background image section */}
//       <Navbar />

//       {/* Main Content Area */}
//       <div className="min-h-screen">
//         <Routes>
//           {/* Apply background image only to login and signup pages */}
//           <Route
//             path="/login"
//             element={
//               <div className="bg-[url(./assets/SU.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
//                 <Login />
//               </div>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <div className="bg-[url(./assets/OIP.jpg)] bg-cover bg-center min-h-screen flex items-center justify-center">
//                 <Signup />
//               </div>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//     </div>
//     </div>
    
//   );
// }

function App() {
  const scheduleID = "415020d3-8d02-11ef-923f-c85acfdb72cc";
  
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
            <Route path="/selection" element={<SeatDisplay />}/>
            <Route
              path='/Home'
              element= {<Home/>}
            />

            <Route
              path='/bookingpage'
              element= {<BookingPageMain/>}
            />

          <Route
              path='/booknow' 
              element= {<BookNowPage></BookNowPage>}
            />
          
            
          </Routes>
          
          </Router>
      
    </div>
  );
}

export default App;
