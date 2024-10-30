//import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="bg-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <h2 className="text-2xl font-bold tracking-wide">Your Logo</h2>
        </div>
        <ul className="flex space-x-6">
          {/* Uncomment these if you want to add more links */}
          {/* <li>
            <Link to="/" className="hover:text-gray-100 hover:underline transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-100 hover:underline transition-colors duration-300">About</Link>
          </li> */}
           <li>
            <Link to="/Home" className="hover:underline transition-all duration-300 border border-white px-4 py-2 rounded-full
            hover:bg-white  hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline transition-all duration-300 border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline transition-all duration-300 border border-white px-4 py-2 rounded-full
            hover:bg-white  hover:text-black">Signup</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
