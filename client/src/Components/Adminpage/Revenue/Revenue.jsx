import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import "./Revenue.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AircraftTypeRevenueChart = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Fetch revenue data from the backend
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:3067/revenuebyaircraft');
                if (response.data.message === 'Revenue by aircraft type retrieved successfully' && response.data.Revenue) {
                    const formattedRevenue = response.data.Revenue.map((item) => ({
                        aircraft: item.Aircraft_type,
                        revenue:parseInt(item.TotalRevenue, 10),
                        totalBookings: parseInt(item.TotalBookings, 10),
                    }));

                    setRevenueData(formattedRevenue);

                    // Calculate the total revenue
                    const total = formattedRevenue.reduce((acc, item) => acc + item.revenue, 0);
                    setTotalRevenue(total);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenue();
    }, []);

    // Prepare data for the chart
    const chartData = {
        labels: revenueData.map(item => item.aircraft),
        datasets: [
            {
                label: "Total Revenue",
                data: revenueData.map(item => item.revenue),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Revenue by Aircraft Type',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString(); // Format as currency
                    }
                }
            }
        }
    };

    return (
        <div className="aircraft-type-revenue-chart">
            <h2>Total Revenue by Aircraft Type</h2>

            {/* Display revenue data and total as text above the chart */}
            <div className="revenue-summary">
                {revenueData.map((item, index) => (
                    <p key={index}>
                        <strong>{item.aircraft}:</strong> ${item.revenue.toLocaleString()}
                    </p>
                ))}
                <p><strong>Total Revenue:</strong> ${totalRevenue.toLocaleString()}</p>
            </div>

            {/* Bar chart for visual representation */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AircraftTypeRevenueChart;
