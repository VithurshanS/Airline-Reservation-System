import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./SeatSelection.css";
import axios from "axios";

const SeatSelection = ({ seatConfig, availableSeats, selectedSeats, setSelectedSeats }) => {

  const { economyRows, businessRows, platinumRows, seatsPerRow } = seatConfig;
  //localStorage.setItem('num_seat',selectedSeats.length);
  console.log("aaaaa", availableSeats);
  

  const handleSeatClick = (seat) => {
    const isAvailable = availableSeats.some((s) => s.Seat_number === seat);
    if (!isAvailable) return;

    console.log(availableSeats);
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeat = (seatNumber, rowType) => {/////////////////////////////////////////
    // const isSelected = selectedSeats.includes(seatNumber);
    // const isAvailable = availableSeats.some(
    //   (seat) => seat.Seat_number === seatNumber
    // );
    const isSelected = selectedSeats.some((s) => s.Seat_number === seatNumber);
      const isAvailable = availableSeats.some((s) => s.Seat_number === seatNumber);
    // Determine the seat color based on availability, selection, and class type
    let seatColor;
    if (!isAvailable) {
      seatColor = "red"; // Unavailable seats are red
    } else if (isSelected) {
      seatColor = "yellow"; // Selected seats are yellow
    } else {
      // Available but not selected - color depends on class type
      seatColor =
        rowType === "Platinum"
          ? "#1976d2"
          : rowType === "Business"
            ? "#64b5f6"
            : "green"; // Default to Economy color
    }

    
  const handleSeatClick = async (seatNumber) => {//////////////////////////////////////////////////////////////////////
    const seatObj = availableSeats.find((s) => s.Seat_number === seatNumber);
    
    if (!seatObj) return; // Only proceed if the seat is available

    if (selectedSeats.some((s) => s.Seat_number === seatNumber)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s.Seat_number !== seatNumber));
      try {
        console.log("its work removing");
        await axios.post('http://localhost:3067/removeselectedseat', {
          seats: seatObj.Seat_ID,
          
        }).then((resd)=>{console.log("seatremove respone mdsss",resd.data.message)});;
        console.log(`Seat ${seatObj.Seat_ID} deselected`);
      } catch (error) {
        console.error('Error deselecting seat:', error);
      }
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seatObj]);
      try {
        console.log("its work selecting");
        await axios.post('http://localhost:3067/addselectedseat', {
          seats: seatObj.Seat_ID,
        }).then((res)=>{console.log("seatadding respone mdsss",res.data.message)});
        console.log(`Seat ${seatObj.Seat_ID} selected`);
      } catch (error) {
        console.error('Error selecting seat:', error);
      }
    }

    
  };

    return (
      <Button
        key={seatNumber}
        variant={isSelected ? "contained" : "outlined"}
        disabled={!isAvailable} // Disable the button if the seat is unavailable
        sx={{
          minWidth: "60px",
          minHeight: "40px",
          color: isSelected ? "#fff" : "#000",
          backgroundColor: seatColor,
          "&:hover": {
            backgroundColor: isSelected ? "#1565c0" : "#bdbdbd",
          },
        }}
        onClick={() => handleSeatClick(seatNumber)}
      >
        {seatNumber}
      </Button>
    );
  };

  const generateSeatNumber = (rowIndex, seatIndex, startingSeatNumber) => {
    return startingSeatNumber + rowIndex * seatsPerRow + seatIndex; // Start seat numbers from the given starting number
  };

  const renderRows = (classType, rowCount, startingSeatNumber) => (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          color:
            classType === "Platinum"
              ? "#1976d2"
              : classType === "Business"
                ? "#64b5f6"
                : "#8bc34a",
        }}
      >
        {classType} Class
      </Typography>
      {[...Array(rowCount)].map((_, rowIndex) => (
        <Grid container spacing={1} key={rowIndex} sx={{ mb: 1 }}>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex}>
                  {renderSeat(
                    generateSeatNumber(rowIndex, seatIndex, startingSeatNumber),
                    classType
                  )}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: "20px" }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 3}>
                  {renderSeat(
                    generateSeatNumber(
                      rowIndex,
                      seatIndex + 3,
                      startingSeatNumber
                    ),
                    classType
                  )}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: "20px" }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 6}>
                  {renderSeat(
                    generateSeatNumber(
                      rowIndex,
                      seatIndex + 6,
                      startingSeatNumber
                    ),
                    classType
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );

  // Calculate starting seat numbers for each class
  const economyStartingSeat = 1;
  const economySeats = economyRows * seatsPerRow;
  const businessStartingSeat = economySeats + 1;
  const businessSeats = businessRows * seatsPerRow;
  const platinumStartingSeat = economySeats + businessSeats + 1;
  const platinumSeats = platinumRows * seatsPerRow;

  return (
    <Box
      className="seat-selection"
      sx={{ p: 4, backgroundColor: "#fff", borderRadius: 2 }}
    >
      <Typography variant="h5" sx={{ mb: 2, color: "#1976d2" }}>
        Select Your Seat
      </Typography>

      {renderRows("Economy", economyRows, economyStartingSeat)}
      <Box sx={{ height: "20px" }} />
      {renderRows("Business", businessRows, businessStartingSeat)}
      <Box sx={{ height: "20px" }} />
      {renderRows("Platinum", platinumRows, platinumStartingSeat)}

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
        
        Selected Seats: {selectedSeats.map((s) => s.Seat_number).join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SeatSelection;
