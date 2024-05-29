import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../styles/WeatherChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const WeatherChart = ({ weeklyTemps }) => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Avg Temperature',
                data: weeklyTemps,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value) => `${value}°C`,
                font: {
                    weight: 'bold'
                },
                color: '#000',
                clamp: true, // Ensures labels stay within the chart area
                clip: true // Prevents labels from being drawn outside the chart area
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grace: '10%' // Add some extra space at the top of the chart
            },
        },
    };

    return (
        <div className="weather-chart">
            <Bar data={data} options={options} />
        </div>
    );
};

export default WeatherChart;
