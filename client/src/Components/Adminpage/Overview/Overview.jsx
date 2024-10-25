//import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart, // Ensure BarChart is imported
    Bar,
  } from 'recharts';
  

// Sample Data
const bookingData = [
  { month: 'Jan', bookings: 120 },
  { month: 'Feb', bookings: 150 },
  { month: 'Mar', bookings: 180 },
  { month: 'Apr', bookings: 220 },
  { month: 'May', bookings: 300 },
];

const revenueData = [
  { name: 'Economy', value: 50000 },
  { name: 'Business', value: 30000 },
  { name: 'First Class', value: 20000 },
];

const demographicData = [
  { name: '18-25', value: 400 },
  { name: '26-35', value: 500 },
  { name: '36-50', value: 300 },
  { name: '50+', value: 200 },
];

const occupancyData = [
    { name: 'Jan', occupancy: 75 },
    { name: 'Feb', occupancy: 80 },
    { name: 'Mar', occupancy: 90 },
    { name: 'Apr', occupancy: 85 },
];
  
const cancellationData = [
    { reason: 'Weather', cancellations: 10 },
    { reason: 'Maintenance', cancellations: 15 },
    { reason: 'Overbooking', cancellations: 5 },
];

const loyaltyData = [
    { level: 'Silver', count: 150 },
    { level: 'Gold', count: 100 },
    { level: 'Platinum', count: 50 },
];
  
const performanceData = [
    { metric: 'On-Time', value: 85 },
    { metric: 'Delayed', value: 10 },
    { metric: 'Cancelled', value: 5 },
];



// Colors for Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Overview() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop:'1050PX', maxWidth:'200%', width:'1150px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#0d47a1', fontWeight: 'bold' }}>
        Admin Overview
      </Typography>
      
      <Grid container spacing={4}>
        {/* Booking Trends Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Booking Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#2196f3" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue Breakdown Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Revenue Breakdown</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: $${entry.value}`}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Passenger Demographics Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Passenger Demographics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Flight Occupancy Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Flight Occupancy</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="occupancy" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Cancellations Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Cancellations by Reason</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cancellationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="reason" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cancellations" fill="#ff5722" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Customer Loyalty Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Customer Loyalty Levels</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loyaltyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={(entry) => `${entry.level}: ${entry.count}`}
                >
                  {loyaltyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Flight Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '100%' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#2196f3' }}>Flight Performance</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>


      </Grid>
    </Box>
  );
}

export default Overview;
