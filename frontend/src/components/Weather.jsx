import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuWind } from "react-icons/lu"; // wind logo
import { IoSunnyOutline } from "react-icons/io5"; // sunny
import { MdOutlineCloud } from "react-icons/md"; // cloudy
import { WiDaySunnyOvercast } from "react-icons/wi"; // partly sunny
import { BsCloudRain } from "react-icons/bs"; //light rain
import { BsCloudRainHeavy } from "react-icons/bs"; // heavy rain
import { TiWeatherSnow } from "react-icons/ti"; // snowy
import { TiWeatherStormy } from "react-icons/ti"; // storm

const Weather = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [icons, setIcons] = useState(false);

  const currentTime = new Date();
  const currentTimeIso = `${currentTime.getUTCFullYear()}-${String(
    currentTime.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(currentTime.getUTCDate()).padStart(
    2,
    "0"
  )}T${String(currentTime.getUTCHours()).padStart(2, "0")}:00`;
  const currentTimeHourly = `${String(currentTime.getUTCDate()).padStart(
    2,
    "0"
  )}/${String(currentTime.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}/${currentTime.getUTCFullYear()} ${currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  })}`;

  const times = `${currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  })}:00`;
  const WEATHER_CODE_DESCRIPTIONS = {
    // ☀️ Clear & Cloudy
    0: <IoSunnyOutline />, // Clear sky
    1: <IoSunnyOutline />, // Mainly clear
    2: <WiDaySunnyOvercast />, // Partly cloudy
    3: <MdOutlineCloud />, // Overcast

    // 🌫️ Fog & Atmospheric
    45: <MdOutlineCloud />, // Fog
    48: <MdOutlineCloud />, // Depositing rime fog

    // 🌧️ Drizzle
    51: <BsCloudRain />, // Light drizzle
    53: <BsCloudRain />, // Moderate drizzle
    55: <BsCloudRain />, // Dense drizzle
    56: <BsCloudRain />, // Light freezing drizzle
    57: <BsCloudRain />, // Dense freezing drizzle

    // 🌧️ Rain
    61: <BsCloudRain />, // Slight rain
    63: <BsCloudRain />, // Moderate rain
    65: <BsCloudRainHeavy />, // Heavy rain
    66: <BsCloudRain />, // Light freezing rain
    67: <BsCloudRainHeavy />, // Heavy freezing rain

    // ❄️ Snow
    71: <TiWeatherSnow />, // Slight snowfall
    73: <TiWeatherSnow />, // Moderate snowfall
    75: <TiWeatherSnow />, // Heavy snowfall
    77: <TiWeatherSnow />, // Snow grains

    // 🌦️ Rain Showers
    80: <BsCloudRain />, // Slight rain showers
    81: <BsCloudRainHeavy />, // Moderate rain showers
    82: <BsCloudRainHeavy />, // Violent rain showers

    // ❄️ Snow Showers
    85: <TiWeatherSnow />, // Slight snow showers
    86: <TiWeatherSnow />, // Heavy snow showers

    // ⛈️ Thunderstorms
    95: <TiWeatherStormy />, // Thunderstorm
    96: <TiWeatherStormy />, // Thunderstorm with slight hail
    99: <TiWeatherStormy />, // Thunderstorm with heavy hail
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
  const index = weatherData.weatherData.time.indexOf(currentTimeIso) + 1;

  const visibility = weatherData?.weatherData?.visibility?.[index] ?? 0;
  const visibility_km = Math.floor(visibility / 1000);
  const forecast = [1, 2, 3, 4, 5];
  const baseHour = currentTime.getHours();
  const hourForecast = forecast.map((n) => {
    const hour = String(baseHour + n).padStart(2, "0");

    return (
      <div className="w-2/10 h-full flex flex-col items-center">
        <p className="font-txtBold font-extrabold pb-2">{hour}:00</p>
        <p className="text-3xl">
          {
            WEATHER_CODE_DESCRIPTIONS[
              weatherData.weatherData.weather_code[index + n]
            ]
          }
        </p>
        <p className="flex flex-row items-center text-xl md:text-xl font-txtBold font-extrabold ">
          {weatherData.weatherData.temperature_2m[index + n]}°
        </p>
        <p className="flex flex-row items-center">
          {weatherData.weatherData.wind_speed_10m[index + n]}
          <p className="text-xs">km/h</p>
        </p>
        <p className="flex flex-row items-center gap-1 font-txtBold text-xs font-extrabold">
          <BsCloudRain />
          {weatherData.weatherData.precipitation_probability[index + n]}%
        </p>
        <p className="flex flex-row items-center gap-1 font-txtBold text-xs font-extrabold">
          {getDirection(weatherData.weatherData.wind_direction_10m[index + n])}
        </p>
      </div>
    );
  });
  return (
    <>
      <div className=" w-full h-auto py-3 flex flex-col items-center justify-center font-txtBold">
        <h1 className="flex flex-row items-center">
          {icons && (
            <p className="mr-4">
              <FaLocationCrosshairs size={30} />
            </p>
          )}
          {activeCity.name} {!icons && `(${activeCity.country_code})`}
        </h1>
        <h3>{currentTimeHourly}</h3>
        <p className="text-[8px]">Last Update at {times}</p>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="w-full flex flex-col py-6 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-8xl">
            {
              WEATHER_CODE_DESCRIPTIONS[
                weatherData.weatherData.weather_code[index]
              ]
            }
          </p>
          <div className="flex flex-row font-txtBold font-bold">
            <p className="text-8xl">
              {weatherData.weatherData.temperature_2m[index]}°
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>
            Feel like: {weatherData.weatherData.apparent_temperature[index]}°
          </p>

          <p className="flex flex-row">visibility: {visibility_km}km</p>
          <p className="flex flex-row">
            <a className="font-txtBold font-bold">
              {getDirection(weatherData.weatherData.wind_direction_10m[index])}
            </a>
            <LuWind className="w-7 h-auto px-2" />
            {weatherData.weatherData.wind_speed_10m[index]} km/h
          </p>
        </div>
      </div>
      <div className="h-auto w-full py-4 md:mt-10">
        <div className="w-full h-10/10 flex flex-row justify-center items-center gap-1">
          {hourForecast}
        </div>
      </div>
      <button onClick={updateCity} className="hidden">
        Update Localisation City
      </button>
    </>
  );
};

export default Weather;
