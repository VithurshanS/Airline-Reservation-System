//import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <h2 className="text-2xl font-bold">Your Logo</h2>
        </div>
        <ul className="flex space-x-6">
          {/*<li>
            <Link to="/" className="hover:text-gray-400 transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400 transition-colors duration-300">About</Link>
          </li>*/}
          <li>
            <Link to="/login" className="hover:text-gray-400 transition-colors duration-300">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-400 transition-colors duration-300">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
