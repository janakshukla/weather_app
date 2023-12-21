"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("rewa");

  const apiKey = "e5fe0b34525e3497e72333045393fa00"; // Replace with your actual key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
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
    <div className="bg-gray-400 flex justify-center items-center h-screen ">
      {" "}
      <div className="bg-gradient-to-br from-sky-700 w-96 h-1/2 uppercase rounded-lg p-5 shadow-lg shadow-white inset-16 ">
        <div className=" flex flex-col">
          <input className="py-4 rounded-md px-2 outline-none uppercase font-semibold"
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name"
          />
          <button  className="my-3 text-white bg-gray-600 mx-auto px-3 py-2 rounded-lg"   onClick={fetchWeather}>Get Weather</button>
          {weatherData && (
            <div>
              <h3>{weatherData.name}</h3>
              <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
              <p>Description: {weatherData.weather[0].main}</p>
              <p> max-temp:{Math.round(weatherData.main.temp_max - 273.15)}°C</p>
              <p> humedity: {weatherData.main.humidity} </p>
  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
