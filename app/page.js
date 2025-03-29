"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassWaterIcon, Wind } from "lucide-react";
import mockData from "@/public/mockdata";


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("rewa");
  const [error, setError] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const apiKey = "e5fe0b34525e3497e72333045393fa00";

  const fetchWeather = async () => {

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data);
      const weatherCondition = response.data.weather[0].description;
      const matchedData = mockData.find(
        (data) => data.weather.toLowerCase().replace(/\s/g, '') === weatherCondition.toLowerCase().replace(/\s/g, '')
      );
      setBgImage(matchedData?.imageUrl || "");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
  fetchWeather();
  }, []);

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };
  if (error?.status === 404) {
    alert("city not found")
    setError(null)
  }



  return (
    <>
      <div className={`bg-cover flex h-screen justify-center relative items-center`}
       style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
        {
          weatherData ? <div>
            <Card>
              <CardContent className="p-4 flex  " >
                <Input placeholder="Enter your city" defaultValue={city} onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={fetchWeather} className=" ml-5 w-1/4" size="small" variant="default">search</Button>
              </CardContent>
            </Card>
            <Card className=" absolute p-5 left-5 bottom-5 sm:h-1/4 sm:w-1/4 bg-transparent backdrop-blur-xl " >
              <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl " >{weatherData?.name}</CardTitle>
              <CardContent className=" ">
                <p className="scroll-m-20 text-xl font-semibold tracking-tight" > {Math.floor(weatherData?.main.temp - 273)}&#176;C</p>
                <p className="sm:flex" ><Wind /> {weatherData?.wind.speed}</p>
                <p className="sm:flex"  ><GlassWaterIcon /> {weatherData?.main.humidity}</p>

              </CardContent>
              <CardFooter className="relative" >
                <img className="absolute right-1 bottom-1 w-1/2" src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt="weather-icon" />
              </CardFooter>
            </Card>
          </div> : <div className="text-4xl font-extrabold tracking-tight" >Loading...</div>
        }
      </div>

    </>
  );
};
export default App;
