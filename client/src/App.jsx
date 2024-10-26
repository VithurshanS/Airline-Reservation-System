import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import Userpage from './Components/Userpage/Userpage';
import Entry from './Components/Entry/entry';
// import Navbar from './assets/Navbar';
import Home from './Components/Home/home';
import Adminpage from './Components/Adminpage/Adminpage';
import Dashboard from './Components/Userpage/Dashboard/Dashboard';
import SeatDisplay from './Components/seatdisplay/SeatDisplay';
import "./App.css"
import BookingPageMain from './Components/BookingPageMain/BookingPageMain';
import BookNowPage from './Components/BookingPageMain/BookNowPage/BookNowPage';
import AdDashboard from './Components/Adminpage/AdDashboard/AdDashboard'

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Entry/>}/>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/Userpage" element={<Userpage />} /> {/* Nested_routes*/}
        <Route path="/Home" element={<Home/>} />
        <Route path="/Adminpage" element={<Adminpage/>}/>
        <Route path="/BookingPageMain" element={<BookingPageMain/>}/>
        <Route path="/booknow" element={<BookNowPage/>}/>
        <Route path="/AdDashboard" element={<AdDashboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
