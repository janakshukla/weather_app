import React from "react";

const Input = ({ handleChange, city,fetchWeather }) => {
  return (
    <div className=" my-2 flex  justify-center
    h-1/6 ">
      {" "}
      <input
        className="py-4 rounded-md px-2 outline-none uppercase font-semibold mr-9"
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button
        className=" h-19 w-16  rounded-full bg-blue-700"
        onClick={fetchWeather}
      >
         &#128269;
      </button>
    </div>
  );
};

export default Input;
