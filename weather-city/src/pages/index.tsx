import React, { useState } from "react";
import axios from "axios";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

const CityWeather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");


  const getWeather = async () => {
    try {
      const weatherUrl = `http://localhost:3001/api/weather?city=${city}`;
      const response = await axios.get(weatherUrl);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found or error fetching data");
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="city-input"
      />
      <button onClick={getWeather} className="get-weather-button">
        Get Weather
      </button>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <p>Temperature: {weather.temperature.toFixed(1)}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          <p>Description: {weather.description}</p>
        </div>
      )}

      <style jsx>{`
        .weather-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .city-input {
          width: calc( 100% - 16px );
          padding: 8px;
          font-size: 16px;
          margin-bottom: 10px;
        }

        .get-weather-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
          border-radius: 5px;
        }

        .get-weather-button:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
        }

        .weather-info {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default CityWeather;
