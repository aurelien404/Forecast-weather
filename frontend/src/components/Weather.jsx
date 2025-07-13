import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Weather = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [icons, setIcons] = useState(false);
  const currentDate = new Date().toLocaleDateString(); // e.g., "7/13/2025"
  const visibility = weatherData.weatherData.visibility[56];
  const visibility_km = Math.floor(visibility / 1000);
  const visibility_meters = visibility % 1000;

  function getDirection(degrees) {
    const dirs = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return dirs[index];
  }

  console.log(getDirection(253));

  const fallbackCity = {
    name: "Lausanne",
    latitude: 46.5197,
    longitude: 6.6323,
    country_code: "CH",
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
  console.log(weatherData);
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
        <p>---</p>
        <p>Time: {currentDate}</p>
        <p>App Time: {weatherData.weatherData.time[56]}</p>
        <p>---</p>
        <p> Weather code {weatherData.weatherData.weather_code[56]}</p>
        <p>Temperature: {weatherData.weatherData.temperature_2m[56]}°C</p>
        <p>Feels-like: {weatherData.weatherData.apparent_temperature[56]}°C</p>
        <p>---</p>
        <p>Visibility: {visibility_km}km</p>
        <p>Wind Speed 10m: {weatherData.weatherData.wind_speed_10m[56]} km/h</p>
        <p>
          Wind Direction 10m:{" "}
          {getDirection(weatherData.weatherData.wind_direction_10m[56])}
        </p>
        <p>---</p>
      </div>
      <button onClick={updateCity}>Update Localisation City</button>
    </div>
  );
};

export default Weather;
