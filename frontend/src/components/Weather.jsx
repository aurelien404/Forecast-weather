import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Weather = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [icons, setIcons] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const currentTimeIso = new Date().toISOString().slice(0, 13) + ":00";

  const WEATHER_CODE_DESCRIPTIONS = {
    // ☀️ Clear & Cloudy
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    // 🌫️ Fog & Atmospheric
    45: "Fog",
    48: "Depositing rime fog",

    // 🌧️ Drizzle
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    // 🌧️ Rain
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",

    // ❄️ Snow
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",

    // 🌦️ Rain Showers
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    // ❄️ Snow Showers
    85: "Slight snow showers",
    86: "Heavy snow showers",

    // ⛈️ Thunderstorms
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

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
      .get("http://192.168.1.177:8000/api/weather", {
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
  const index = weatherData.weatherData.time.findIndex(
    (time) => time === currentTimeIso
  );
  const visibility = weatherData?.weatherData?.visibility?.[index] ?? 0;
  const visibility_km = Math.floor(visibility / 1000);

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
        <p>App Time: {weatherData.weatherData.time[index]}</p>
        <p>---</p>
        <p>
          {" "}
          Weather code:{" "}
          {
            WEATHER_CODE_DESCRIPTIONS[
              weatherData.weatherData.weather_code[index]
            ]
          }
        </p>
        <p>Temperature: {weatherData.weatherData.temperature_2m[index]}°C</p>
        <p>
          Feels-like: {weatherData.weatherData.apparent_temperature[index]}°C
        </p>
        <p>---</p>
        <p>Visibility: {visibility_km}km</p>
        <p>
          Wind Speed 10m: {weatherData.weatherData.wind_speed_10m[index]} km/h
        </p>
        <p>
          Wind Direction 10m:{" "}
          {getDirection(weatherData.weatherData.wind_direction_10m[index])}
        </p>
        <p>---</p>
      </div>
      <button onClick={updateCity}>Update Localisation City</button>
    </div>
  );
};

export default Weather;
