import { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';

// Hardcoded sample data
const passengersData = [
  { flightNo: 'BA123', name: 'John Doe', age: 16, destination: 'Jakarta', bookingType: 'Economy', date: '2024-10-25' },
  { flightNo: 'BA123', name: 'Jane Smith', age: 20, destination: 'Jakarta', bookingType: 'Business', date: '2024-10-25' },
  { flightNo: 'BA123', name: 'Emily Johnson', age: 17, destination: 'Jakarta', bookingType: 'Economy', date: '2024-10-25' },
  { flightNo: 'BA456', name: 'Michael Brown', age: 30, destination: 'Bali', bookingType: 'First Class', date: '2024-10-26' },
  { flightNo: 'BA456', name: 'Sophia Davis', age: 22, destination: 'Bali', bookingType: 'Economy', date: '2024-10-26' },
  // More passengers can be added here
];

function PassengerDetails() {
  const [flightNo, setFlightNo] = useState('');
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  //const [passengerType, setPassengerType] = useState('');

  // Filter passengers below and above 18 for a given flight
  const getPassengersByFlight = (flightNo) => {
    return passengersData.filter(passenger => passenger.flightNo === flightNo);
  };

  // Get number of passengers below and above 18
  const getAgeGroupedPassengers = () => {
    const grouped = { below18: [], above18: [] };
    const filteredPassengers = getPassengersByFlight(flightNo);
    filteredPassengers.forEach(passenger => {
      if (passenger.age < 18) {
        grouped.below18.push(passenger);
      } else {
        grouped.above18.push(passenger);
      }
    });
    return grouped;
  };

  // Get number of bookings by passenger type for a date range
  const getBookingsByType = () => {
    const bookingsCount = {};
    const { start, end } = dateRange;
    passengersData.forEach(passenger => {
      if (passenger.date >= start && passenger.date <= end) {
        bookingsCount[passenger.bookingType] = (bookingsCount[passenger.bookingType] || 0) + 1;
      }
    });
    return bookingsCount;
  };

  // Get past flights data for given origin and destination
  const getPastFlights = () => {
    // This example assumes past flights data is the same as passengersData
    return passengersData.filter(passenger => passenger.destination === destination);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#0d47a1', fontWeight: 'bold' }}>
        Passenger Details
      </Typography>

      {/* Flight No Input */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Passenger Count by Flight</Typography>
            <TextField
              label="Flight No"
              variant="outlined"
              fullWidth
              value={flightNo}
              onChange={(e) => setFlightNo(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={() => getAgeGroupedPassengers()}>
              Get Passengers
            </Button>

            {/* Display Passenger Counts */}
            {flightNo && (
              <Box mt={2}>
                <Typography variant="body1">Passengers below 18: {getAgeGroupedPassengers().below18.length}</Typography>
                <Typography variant="body1">Passengers above 18: {getAgeGroupedPassengers().above18.length}</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Booking by Type */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Bookings by Passenger Type</Typography>
            <TextField
              label="Date Range Start (YYYY-MM-DD)"
              variant="outlined"
              fullWidth
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Date Range End (YYYY-MM-DD)"
              variant="outlined"
              fullWidth
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={() => getBookingsByType()}>
              Get Bookings
            </Button>

            {/* Display Booking Counts */}
            {dateRange.start && dateRange.end && (
              <Box mt={2}>
                <Typography variant="body1">
                  Booking Counts: {JSON.stringify(getBookingsByType())}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Past Flights */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Past Flights</Typography>
            <TextField
              label="Destination"
              variant="outlined"
              fullWidth
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={() => getPastFlights()}>
              Get Past Flights
            </Button>

            {/* Display Past Flights */}
            {destination && (
              <Box mt={2}>
                <Typography variant="body1">
                  Past Flights Data: {JSON.stringify(getPastFlights())}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PassengerDetails;
