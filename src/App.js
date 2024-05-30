import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCards from './Components/WeatherCards';
import WeatherChart from './Components/WeatherChart';
import NotePad from './Components/NotePad';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState({
        avgTemp: null,
        avgRainfall: null,
        avgHumidity: null,
        currentTemp: null,
        weeklyTemps: [],
    });
    const [location, setLocation] = useState({ lat: null, lon: null, name: '' });

    useEffect(() => {
        const fetchWeatherData = async (lat, lon) => {
            try {
                const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
                const data = response.data;
                console.log("API data", data);

                // Calculating the average rainfall for the week
                const avgRainfall = data.forecast.forecastday.reduce((acc, day) => acc + day.day.totalprecip_mm, 0) / data.forecast.forecastday.length;

                // Extracting weekly temperatures
                const weeklyTemps = data.forecast.forecastday.map(day => day.day.avgtemp_c);

                setWeatherData({
                    avgTemp: data.current.temp_c,
                    avgRainfall: avgRainfall,
                    avgHumidity: data.current.humidity,
                    currentTemp: data.current.temp_c,
                    weeklyTemps: weeklyTemps,
                });

                setLocation(prevLocation => ({
                    ...prevLocation,
                    name: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
                }));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lon: longitude });
                        fetchWeatherData(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting location', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            {location.name && <h2>{location.name}</h2>}
            <WeatherCards data={weatherData} />
            <WeatherChart weeklyTemps={weatherData.weeklyTemps} />
            <NotePad />
        </div>
    );
};

export default App;
