const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = "5e9833792a1a627137a662dd45eacbee";

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const data = response.data;
    const weather = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
    };
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
