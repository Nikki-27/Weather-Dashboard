import React from 'react';
import '../styles/WeatherCards.css';

const WeatherCards = ({ data }) => {
    const { avgTemp, avgRainfall, avgHumidity, currentTemp } = data;

    const formatNumber = (number) => {
        return number ? Number(number).toPrecision(4) : 'Loading...';
    };
    return (
        <div className="weather-cards">
        <div className="card">
            <div className="card-label">Avg Temp:</div>
            <div className="card-value">{avgTemp ?? 'Loading...'}</div>
        </div>
        <div className="card">
            <div className="card-label">Avg Rainfall:</div>
            <div className="card-value">{formatNumber(avgRainfall)}</div>
        </div>
        <div className="card">
            <div className="card-label">Avg Humidity:</div>
            <div className="card-value">{avgHumidity ?? 'Loading...'}</div>
        </div>
        <div className="card">
            <div className="card-label">Current Temp:</div>
            <div className="card-value">{currentTemp ?? 'Loading...'}</div>
        </div>
    </div>
    );
};

export default WeatherCards;
