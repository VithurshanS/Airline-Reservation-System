import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';

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
  const [ageGroupedPassengers, setAgeGroupedPassengers] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);
  const [bookingCounts, setBookingCounts] = useState(null);
  const [pastFlights, setPastFlights] = useState(null);

  const getPassengersByFlight = (flightNo) => {
    return passengersData.filter(passenger => passenger.flightNo === flightNo);
  };

  const handleGetAgeGroupedPassengers = () => {
    const grouped = { below18: [], above18: [] };
    const filteredPassengers = getPassengersByFlight(flightNo);
    filteredPassengers.forEach(passenger => {
      if (passenger.age < 18) {
        grouped.below18.push(passenger);
      } else {
        grouped.above18.push(passenger);
      }
    });
    setAgeGroupedPassengers(grouped);
  };

  const handleGetPassengerCountByDestinationAndDate = () => {
    const { start, end } = dateRange;
    const count = passengersData.filter(passenger => passenger.date >= start && passenger.date <= end && passenger.arrival === arrival).length;
    setPassengerCount(count);
  };

  const handleGetBookingsByType = () => {
    const bookingsCount = { Gold: 0, Frequent: 0, Regular: 0, Guest: 0 };
    const { start, end } = dateRange;
    passengersData.forEach(passenger => {
      if (passenger.date >= start && passenger.date <= end) {
        bookingsCount[passenger.passengerType] = (bookingsCount[passenger.passengerType] || 0) + 1;
      }
    });
    setBookingCounts(bookingsCount);
  };

  const handleGetPastFlights = () => {
    const flights = passengersData.filter(
      passenger => passenger.departure === departure && passenger.arrival === arrival
    );
    setPastFlights(flights);
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3067/passengers-by-age/:flight_no/${scheduleId}`)
  //     .then((response) => {
  //       const seatDetails = response.data.results[0]?.[0];
  //       console.log("getseatsss", response.data.results);
  //       if (seatDetails) {
  //         setTotalSeats(seatDetails.Total_seats);
  //         setEconomySeatStart(seatDetails.Economy_seat_start_no);
  //         setBusinessSeatStart(seatDetails.Business_seat_start_no);
  //         setPlatinumSeatStart(seatDetails.Platinum_seat_start_no);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching seat details:", error);
  //     });
  // }, [scheduleId]);

  

  return (
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

            {ageGroupedPassengers && (
              <Box sx={{ p: 2, backgroundColor: '#f1f8e9', borderRadius: '8px', mt: 2 }}>
                <Typography variant="body1">Below 18: {ageGroupedPassengers.below18.length}</Typography>
                <Typography variant="body1">Above 18: {ageGroupedPassengers.above18.length}</Typography>
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
  );
}

export default Report;
