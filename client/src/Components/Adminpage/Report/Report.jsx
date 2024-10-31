import { useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, TextField, Button } from "@mui/material";

function Report() {
  const [flightSchedule, setFlightNo] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [ageGroupedPassengers, setAgeGroupedPassengers] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);
  const [bookingCounts, setBookingCounts] = useState(null);
  const [pastFlights, setPastFlights] = useState(null);

  const getPassengersByFlight = async (flightSchedule) => {
    try {
      const response = await axios.get(
        `http://localhost:3067/passengers-by-age/${flightSchedule}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching passengers:", error);
      return [];
    }
  };

  const getPassengerCountByDestinationAndDate = async (
    startDate,
    endDate,
    destination
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3067/passenger-count-by-destination`,
        { startDate, endDate, destination }
      );
      console.log(response);
      return response.data.PassengerCount;
    } catch (error) {
      console.error("Error fetching passengers:", error);
      return 0;
    }
  };

  const getPastFlights = async (origin, destination) => {
    try {
      const response = await axios.post(`http://localhost:3067/past-flights`, {
        origin,
        destination,
      });
      console.log(response);
      return response.data.Flights;
    } catch (error) {
      console.error("Error fetching passengers:", error);
      return [];
    }
  };

  const getBookingsByType = async (startDate, endDate) => {
    try {
      const response = await axios.post(
        `http://localhost:3067/bookings-by-category`,
        { startDate, endDate }
      );
      console.log(response);
      return response.data.Bookings;
    } catch (error) {
      console.error("Error fetching passengers:", error);
      return [];
    }
  };

  const handleGetAgeGroupedPassengers = async () => {
    const grouped = await getPassengersByFlight(flightSchedule);
    setAgeGroupedPassengers(grouped);
  };

  const handleGetPassengerCountByDestinationAndDate = async () => {
    const { start, end } = dateRange;
    const count = await getPassengerCountByDestinationAndDate(
      start,
      end,
      arrival
    );
    setPassengerCount(count);
  };

  const handleGetBookingsByType = async () => {
    const { start, end } = dateRange;
    const bookingsCount = await getBookingsByType(start, end);
    setBookingCounts(bookingsCount);
  };

  const handleGetPastFlights = async () => {
    const flights = await getPastFlights(departure, arrival);
    setPastFlights(flights);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: "#1565c0", fontWeight: "bold" }}
      >
        Passenger Details Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, backgroundColor: "#fffde7" }}>
            <Typography
              variant="h5"
              sx={{ color: "#424242", fontWeight: "bold", mb: 2 }}
            >
              Passenger Count by Flight
            </Typography>
            <TextField
              label="Flight Schedule"
              variant="outlined"
              fullWidth
              value={flightSchedule}
              onChange={(e) => setFlightNo(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetAgeGroupedPassengers}
              sx={{ mb: 2, width: "100%" }}
            >
              Get Passengers
            </Button>

            {ageGroupedPassengers && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#f1f8e9",
                  borderRadius: "8px",
                  mt: 2,
                }}
              >
                {ageGroupedPassengers.below18.length > 0 ? (
                  ageGroupedPassengers.below18.map((passenger, index) => (
                    <Box key={index} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #c8e6c9" }}>
                      <Typography variant="body2">
                        Name: {passenger.Passenger_Name}
                      </Typography>
                      <Typography variant="body2">
                        Age: {passenger.AGE}
                      </Typography>
                      <Typography variant="body2">
                        Gender: {passenger.Gender}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">No passengers below 18</Typography>
                )}

                {ageGroupedPassengers.aboveOrEqual18.length > 0 ? (
                  ageGroupedPassengers.aboveOrEqual18.map((passenger, index) => (
                    <Box key={index} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #c8e6c9" }}>
                      <Typography variant="body2">
                        Name: {passenger.Passenger_Name}
                      </Typography>
                      <Typography variant="body2">
                        Age: {passenger.AGE}
                      </Typography>
                      <Typography variant="body2">
                        Gender: {passenger.Gender}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">No passengers above 18</Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, backgroundColor: "#e1f5fe" }}>
            <Typography
              variant="h5"
              sx={{ color: "#424242", fontWeight: "bold", mb: 2 }}
            >
              Passenger Count by Date Range and Destination
            </Typography>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Destination"
              variant="outlined"
              fullWidth
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGetPassengerCountByDestinationAndDate}
              sx={{ mb: 2, width: "100%" }}
            >
              Get Passenger Count
            </Button>

            {passengerCount !== null && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#fce4ec",
                  borderRadius: "8px",
                  mt: 2,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Passenger Count: {passengerCount}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, backgroundColor: "#e8f5e9" }}>
            <Typography
              variant="h5"
              sx={{ color: "#424242", fontWeight: "bold", mb: 2 }}
            >
              Passenger Count by Type and Date Range
            </Typography>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleGetBookingsByType}
              sx={{ mb: 2, width: "100%" }}
            >
              Get Booking Counts
            </Button>

            {bookingCounts && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#f1f8e9",
                  borderRadius: "8px",
                  mt: 2,
                }}
              >
                <Typography variant="body2">
                  Booking Counts: {JSON.stringify(bookingCounts)}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, backgroundColor: "#fce4ec" }}>
            <Typography
              variant="h5"
              sx={{ color: "#424242", fontWeight: "bold", mb: 2 }}
            >
              Past Flights between Locations
            </Typography>
            <TextField
              label="Departure"
              variant="outlined"
              fullWidth
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Arrival"
              variant="outlined"
              fullWidth
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={handleGetPastFlights}
              sx={{ mb: 2, width: "100%" }}
            >
              Get Past Flights
            </Button>

            {pastFlights && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#f1f8e9",
                  borderRadius: "8px",
                  mt: 2,
                }}
              >
                <Typography variant="body2">
                  Past Flights: {JSON.stringify(pastFlights)}
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
