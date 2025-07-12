import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Weather = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [icons, setIcons] = useState(false);

  const fallbackCity = {
    name: "Lausanne",
    latitude: 46.5197,
    longitude: 6.6323,
  };

  const [activeCity, setActiveCity] = useState(city || fallbackCity);
  const updateCity = () => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    )
      .then((res) => res.json())
      .then((data) => {
        setActiveCity({
          name: data.city,
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setIcons(true);
      })
      .catch((err) => console.error("Reverse geocoding failed:", err));
  };

  useEffect(() => {
    if (city) {
      setActiveCity(city);
      setIcons(false);
    } else if (coords) {
      updateCity();
      setIcons(true);
    } else {
      setActiveCity(fallbackCity);
      setIcons(false);
    }
  }, [coords, city]);

  useEffect(() => {
    if (!activeCity) return;
    axios
      .get("http://localhost:8000/api/weather", {
        params: {
          lat: activeCity.latitude,
          lon: activeCity.longitude,
          name: activeCity.name,
        },
      })
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((err) =>
        setError(err.response?.data?.error || "Something went wrong")
      );
  }, [activeCity]);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h1 className="flex flex-row items-center">
        {icons && (
          <p className="mr-4">
            <FaLocationCrosshairs size={30} />
          </p>
        )}
        Weather in {activeCity.name} {!icons && `(${activeCity.country_code})`}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="text-lg">
        <p>🌡 Temperature: {weatherData.weatherData.temperature}°C</p>
        <p>💨 Wind Speed: {weatherData.weatherData.windspeed} km/h</p>
      </div>
      <button onClick={updateCity}>Update Localisation City</button>
    </div>
  );
};

export default Weather;
