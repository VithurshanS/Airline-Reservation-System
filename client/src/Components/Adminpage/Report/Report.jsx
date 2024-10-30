import { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import axios from 'axios';


const passengersData = [
  { flightNo: 'BA123', name: 'John Doe', age: 16, passengerType: 'Gold',  bookingType: 'Economy', date: '2024-10-25', departure: 'Jakarta', arrival: 'Bali', departureTime: '2024-10-25T10:00', arrivalTime: '2024-10-25T12:00' },
  { flightNo: 'BA123', name: 'Jane Smith', age: 20, passengerType: 'Frequent',  bookingType: 'Business', date: '2024-10-25', departure: 'Jakarta', arrival: 'Bali', departureTime: '2024-10-25T10:00', arrivalTime: '2024-10-25T12:00' },
  { flightNo: 'BA123', name: 'Emily Johnson', age: 17, passengerType: 'Regular',  bookingType: 'Economy', date: '2024-10-25', departure: 'Jakarta', arrival: 'Bali', departureTime: '2024-10-25T10:00', arrivalTime: '2024-10-25T12:00' },
  { flightNo: 'BA456', name: 'Michael Brown', age: 30, passengerType: 'Guest',  bookingType: 'First Class', date: '2024-10-26', departure: 'Jakarta', arrival: 'Sri', departureTime: '2024-10-26T14:00', arrivalTime: '2024-10-26T18:00' },
  { flightNo: 'BA456', name: 'Sophia Davis', age: 22, passengerType: 'Regular',  bookingType: 'Economy', date: '2024-10-26', departure: 'Jakarta', arrival: 'Bali', departureTime: '2024-10-26T14:00', arrivalTime: '2024-10-26T18:00' },
];

function Report() {
  const [flightNo, setFlightNo] = useState('');
  //const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [passengerCount, setPassengerCount] = useState(null);
  const [bookingCounts, setBookingCounts] = useState(null);
  const [pastFlights, setPastFlights] = useState(null);
  const [below18, setBelow18] = useState(0);
  const [above18, setAbove18] = useState(0);
  const [aircraftRevenue, setAircraftRevenue] = useState(null);
  

 

  const getPassengersByFlight = async (flight_no) => {
    try {
      const response = await axios.get(`http://localhost:3067/passengers-by-age/${flight_no}`);
      
      if (response.status === 200) {
        setBelow18(response.data.below18.length);
        setAbove18(response.data.aboveOrEqual18.length);
      }
      else{
        alert(response.message);
      }
      
    } catch (error) {
      alert(error);
    }

    // return passengersData.filter(passenger => passenger.flightNo === flightNo);
  };

  const handleGetAgeGroupedPassengers = () => {
    getPassengersByFlight(flightNo);
  };

  const handleGetPassengerCountByDestinationAndDate = async () => {
      try {
        const response = await axios.post(`http://localhost:3067/passenger-count-by-destination`, {
          "startDate": dateRange.start,
          "endDate": dateRange.end,
          "destination": arrival,
        });
        if (response.status === 200) {
          setPassengerCount(response.data.PassengerCount);
        }
        else{
          alert(response.message);
        }
      } catch (error) {
        alert(error);
      }
  };

  const handleGetBookingsByType = async () => {
    try {
      const response = await axios.post(`http://localhost:3067/bookings-by-category`, {
        "startDate": dateRange.start,
        "endDate": dateRange.end
      });
      if (response.data.status === 200) {
        setBookingCounts(response.data.Bookings);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching booking counts:', error);
      alert(error.response?.data?.message || 'Failed to fetch booking counts');
    }
  };

  
  const handleGetPastFlights = async () => {
    try {
      const response = await axios.post(`http://localhost:3067/past-flights`, {
        "origin": departure,
        "destination": arrival
      });
      if (response.data.status === 200) {
        setPastFlights(response.data.Flights);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching past flights:', error);
      alert(error.response?.data?.message || 'Failed to fetch past flights data');
    }
  };



  const handleGetAircraftRevenue = async () => {
    try {
      const response = await axios.get(`http://localhost:3067/revenue-by-aircraft`);
      if (response.data.status === 200) {
        setAircraftRevenue(response.data.Revenue);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching aircraft revenue:', error);
      alert(error.response?.data?.message || 'Failed to fetch aircraft revenue data');
    }
  };

  return (
    <Box>
      <Box sx={{ p: 4, backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#1565c0', fontWeight: 'bold' }}>
          Passenger Details Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, backgroundColor: '#fffde7' }}>
              <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'bold', mb: 2 }}>Passenger Count by Flight</Typography>
              <TextField
                label="Flight No"
                variant="outlined"
                fullWidth
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleGetAgeGroupedPassengers} sx={{ mb: 2, width: '100%' }}>
                Get Passengers
              </Button>

              {(
                <Box sx={{ p: 2, backgroundColor: '#f1f8e9', borderRadius: '8px', mt: 2 }}>
                  <Typography variant="body1">Below 18: {below18}</Typography>
                  <Typography variant="body1">Above 18: {above18}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, backgroundColor: '#e1f5fe' }}>
              <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'bold', mb: 2 }}>Passenger Count by Date Range and Destination</Typography>
              <TextField
                label="Start Date (YYYY-MM-DD)"
                variant="outlined"
                fullWidth
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date (YYYY-MM-DD)"
                variant="outlined"
                fullWidth
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Destination"
                variant="outlined"
                fullWidth
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="secondary" onClick={handleGetPassengerCountByDestinationAndDate} sx={{ mb: 2, width: '100%' }}>
                Get Passenger Count
              </Button>

              {passengerCount !== null && (
                <Box sx={{ p: 2, backgroundColor: '#ffecb3', borderRadius: '8px', mt: 2 }}>
                  <Typography variant="body1">Passenger Count: {passengerCount}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, backgroundColor: '#fff3e0' }}>
              <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'bold', mb: 2 }}>Bookings by Passenger Type</Typography>
              <TextField
                label="Start Date (YYYY-MM-DD)"
                variant="outlined"
                fullWidth
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date (YYYY-MM-DD)"
                variant="outlined"
                fullWidth
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="success" onClick={handleGetBookingsByType} sx={{ mb: 2, width: '100%' }}>
                Get Booking Counts
              </Button>

              {bookingCounts && (
                <Box sx={{ p: 2, backgroundColor: '#fbe9e7', borderRadius: '8px', mt: 2 }}>
                  <Typography variant="body1">Bookings: {JSON.stringify(bookingCounts)}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{ p: 4, backgroundColor: '#e0f7fa' }}>
              <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'bold', mb: 2 }}>Past Flights by Route</Typography>
              <TextField
                label="Departure Airport"
                variant="outlined"
                fullWidth
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Arrival Airport"
                variant="outlined"
                fullWidth
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="info" onClick={handleGetPastFlights} sx={{ mb: 2, width: '100%' }}>
                Get Past Flights
              </Button>

              {pastFlights && (
                <Box sx={{ p: 2, backgroundColor: '#dcedc8', borderRadius: '8px', mt: 2 }}>
                  <Typography variant="body1">Past Flights: {JSON.stringify(pastFlights)}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, backgroundColor: '#f3e5f5' }}>
            <Typography variant="h5" sx={{ color: '#424242', fontWeight: 'bold', mb: 2 }}>Revenue by Aircraft</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleGetAircraftRevenue} 
              sx={{ mb: 2, width: '100%' }}
            >
              Get Aircraft Revenue
            </Button>

            {aircraftRevenue && (
              <Box sx={{ p: 2, backgroundColor: '#e1bee7', borderRadius: '8px', mt: 2 }}>
                <Typography variant="body1">
                  Revenue by Aircraft: {JSON.stringify(aircraftRevenue)}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Report;
