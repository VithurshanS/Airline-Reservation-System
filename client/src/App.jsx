
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import Userpage from './Components/Userpage/Userpage';
import Entry from './Components/Entry/entry';
// import Navbar from './assets/Navbar';
import Home from './Components/Home/home';
import Adminpage from './Components/Adminpage/Adminpage';
import Dashboard from './Components/Userpage/Dashboard/Dashboard';


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
        
      </Routes>
    </Router>
  );
}

export default App;
