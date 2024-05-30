import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY;

const handler = async (req, res) => {
  const { lat, lon, days } = req.query;

  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
  }
};

export default handler;