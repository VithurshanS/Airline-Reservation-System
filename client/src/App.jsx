import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Login from './login';
import Signup from './signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/Navbar';

function App() {
  return (
    <Router>
      {/* Navbar should stay outside the background image section */}
      <Navbar />

      {/* Main Content Area */}
      <div className="min-h-screen">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
