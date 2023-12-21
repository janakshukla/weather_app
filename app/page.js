"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('rewa');

  const apiKey = 'e5fe0b34525e3497e72333045393fa00'; // Replace with your actual key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleChange} placeholder="Enter city name" />
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Description: {weatherData.weather[0].main}</p>
          {/* Add more weather information here based on response data */}
        </div>
      )}
    </div>
  )
      }
export default App;
