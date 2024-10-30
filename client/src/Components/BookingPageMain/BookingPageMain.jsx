import React from 'react'
import BookingPage from './BookingPage/BookingPage'
//import AdminPage from '../AdminPages/AdminPages'
import NavBar from '../../assets/Navbar'
function BookingPageMain() {
  return (
    <div> 
        <NavBar/>
        <BookingPage/>
        {/* <AdminPage/> */}
        </div>
  )
}

export default BookingPageMain