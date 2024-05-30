const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/weather/:lat/:lon/days/:days', async (req, res) => {
  const { lat, lon, days } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Weather proxy server listening at http://localhost:${port}`);
});