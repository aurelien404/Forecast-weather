import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fallbackCity = {
    name: "Lausanne",
    latitude: 46.5197,
    longitude: 6.6323,
    country_code: "CH",
  };

  // 👇 Define activeCity here so it's accessible in JSX
  const activeCity = city || fallbackCity;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/weather", {
        params: {
          lat: activeCity.latitude,
          lon: activeCity.longitude,
          name: activeCity.name,
        },
      })
      .then((res) => setWeatherData(res.data))
      .catch((err) =>
        setError(err.response?.data?.error || "Something went wrong")
      );
  }, [city]);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h1>
        Weather in {activeCity.name} ({activeCity.country_code})
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="text-lg">
        <p>🌡 Temperature: {weatherData.weatherData.temperature}°C</p>
        <p>💨 Wind Speed: {weatherData.weatherData.windspeed} km/h</p>
      </div>
    </div>
  );
};

export default Weather;
