// import React, { useState } from 'react';
// import './AdminPage.css';

// const AdminPage = () => {
//     const [flightNo, setFlightNo] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [destination, setDestination] = useState('');
//     const [origin, setOrigin] = useState('');
//     const [results, setResults] = useState(null);

//     const handleFlightSearch = async () => {
//         try {
//             const response = await fetch(`https://yourapi.com/api/passengers/flight/${flightNo}`);
//             const data = await response.json();
//             setResults(data);
//         } catch (error) {
//             console.error("Error fetching flight data:", error);
//         }
//     };

//     const handleDateRangeSearch = async () => {
//         try {
//             const response = await fetch(`https://yourapi.com/api/passengers/destination`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ startDate, endDate, destination })
//             });
//             const data = await response.json();
//             setResults(data);
//         } catch (error) {
//             console.error("Error fetching date range data:", error);
//         }
//     };

//     const handleBookingTypeSearch = async () => {
//         try {
//             const response = await fetch(`https://yourapi.com/api/bookings/type`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ startDate, endDate })
//             });
//             const data = await response.json();
//             setResults(data);
//         } catch (error) {
//             console.error("Error fetching booking type data:", error);
//         }
//     };

//     const handlePastFlightSearch = async () => {
//         try {
//             const response = await fetch(`https://yourapi.com/api/flights/history`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ origin, destination })
//             });
//             const data = await response.json();
//             setResults(data);
//         } catch (error) {
//             console.error("Error fetching past flight data:", error);
//         }
//     };

//     return (
//         <div className="admin-page">
//             <h2 className="admin-page-title">Admin Dashboard</h2>
            
//             <div className="admin-section">
//                 <h3>Passengers by Flight and Age</h3>
//                 <input 
//                     type="text" 
//                     value={flightNo} 
//                     onChange={(e) => setFlightNo(e.target.value)} 
//                     placeholder="Enter Flight No"
//                     className="admin-input"
//                 />
//                 <button onClick={handleFlightSearch} className="admin-button">Search</button>
//             </div>

//             <div className="admin-section">
//                 <h3>Passengers by Destination and Date Range</h3>
//                 <input 
//                     type="date" 
//                     value={startDate} 
//                     onChange={(e) => setStartDate(e.target.value)} 
//                     className="admin-input"
//                 />
//                 <input 
//                     type="date" 
//                     value={endDate} 
//                     onChange={(e) => setEndDate(e.target.value)} 
//                     className="admin-input"
//                 />
//                 <input 
//                     type="text" 
//                     value={destination} 
//                     onChange={(e) => setDestination(e.target.value)} 
//                     placeholder="Enter Destination"
//                     className="admin-input"
//                 />
//                 <button onClick={handleDateRangeSearch} className="admin-button">Search</button>
//             </div>

//             <div className="admin-section">
//                 <h3>Bookings by Passenger Type</h3>
//                 <input 
//                     type="date" 
//                     value={startDate} 
//                     onChange={(e) => setStartDate(e.target.value)} 
//                     className="admin-input"
//                 />
//                 <input 
//                     type="date" 
//                     value={endDate} 
//                     onChange={(e) => setEndDate(e.target.value)} 
//                     className="admin-input"
//                 />
//                 <button onClick={handleBookingTypeSearch} className="admin-button">Search</button>
//             </div>

//             <div className="admin-section">
//                 <h3>Past Flights by Origin and Destination</h3>
//                 <input 
//                     type="text" 
//                     value={origin} 
//                     onChange={(e) => setOrigin(e.target.value)} 
//                     placeholder="Enter Origin"
//                     className="admin-input"
//                 />
//                 <input 
//                     type="text" 
//                     value={destination} 
//                     onChange={(e) => setDestination(e.target.value)} 
//                     placeholder="Enter Destination"
//                     className="admin-input"
//                 />
//                 <button onClick={handlePastFlightSearch} className="admin-button">Search</button>
//             </div>

//             <div className="admin-results">
//                 <h3>Results</h3>
//                 <pre>{results ? JSON.stringify(results, null, 2) : "No results to display"}</pre>
//             </div>
//         </div>
//     );
// };

// export default AdminPage;
