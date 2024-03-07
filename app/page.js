"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./component/Input";

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

<>
<div className="w-screen bg-gray-900 h-screen flex justify-center items-center">

  <div className="h-96 w-96 shadow-sm rounded-2xl  shadow-gray-300 inset-10">
     <Input 
     handleChange={handleChange}
     city={city}
     fetchWeather={fetchWeather}
     
     />
     { !weatherData &&
  <div  className=" w-full flex items-center px-8 py-12"><div className="h-12 w-12  animate-spin rounded-full border-t-2 border-white  "></div> </div>
}
{weatherData && (
            <div className="text-white w-full flex items-center px-8 py-12">
             <div>
             <h3>{weatherData.name}</h3>
              <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
              <p>Description: {weatherData.weather[0].main}</p>
              <p> max-temp:{Math.round(weatherData.main.temp_max - 273.15)}°C</p>
              <p> humedity: {weatherData.main.humidity} </p>
  
             </div>
            </div>
          )}
  </div>
</div>

</>
   );
};
export default App;
