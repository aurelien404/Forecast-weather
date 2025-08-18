import { useEffect, useState } from "react";
import api from "../api";

import { useTranslation } from "react-i18next";

import HourlyJsx from "./Hourly_Weather";
import DailyJsx from "./Daily_Weather";

import { FaLocationCrosshairs } from "react-icons/fa6";
import { LuWind } from "react-icons/lu"; // wind logo
import { IoSunnyOutline } from "react-icons/io5"; // sunny
import { IoIosCloudOutline } from "react-icons/io"; // cloudy
import { IoPartlySunnyOutline } from "react-icons/io5"; // partly sunny
import { BsCloudRain } from "react-icons/bs"; //light rain
import { BsCloudRainHeavy } from "react-icons/bs"; // heavy rain
import { TiWeatherSnow } from "react-icons/ti"; // snowy
import { TiWeatherStormy } from "react-icons/ti"; // storm

import { TiLocationArrow } from "react-icons/ti";

const Weather = ({ i18n, city, coords }) => {
  const { t } = useTranslation();

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
    2: <IoPartlySunnyOutline />, // Partly cloudy
    3: <IoIosCloudOutline />, // Overcast

    // 🌫️ Fog & Atmospheric
    45: <IoIosCloudOutline />, // Fog
    48: <IoIosCloudOutline />, // Depositing rime fog

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

  const fallbackCity = () => {
    const lng = i18n;
    let defaultCity;

    if (lng.includes("CH")) {
      defaultCity = {
        name: "Bern",
        latitude: 46.9481,
        longitude: 7.4474,
        country_code: "CH",
      };
    } else if (lng.startsWith("fr")) {
      defaultCity = {
        name: "Paris",
        latitude: 48.8566,
        longitude: 2.3522,
        country_code: "FR",
      };
    } else if (lng.includes("GB") || lng.startsWith("en")) {
      defaultCity = {
        name: "London",
        latitude: 51.5074,
        longitude: -0.1278,
        country_code: "GB",
      };
    } else {
      defaultCity = {
        name: "Ullapool",
        latitude: 57.8954,
        longitude: 5.1613,
        country_code: "GB",
      };
    }
    return defaultCity;
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
    api
      .get("/weather", {
        params: {
          lat: activeCity.latitude,
          lon: activeCity.longitude,
          name: activeCity.name,
        },
      })
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((err) => setError(err.response?.data?.error || t("error")));
  }, [activeCity]);

  if (!weatherData) {
    return <p>{t("loading")}</p>;
  }

  const index = weatherData.weatherData.time.indexOf(currentTimeIso) + 1;

  const visibility = weatherData?.weatherData?.visibility?.[index] ?? 0;
  const visibility_km = Math.floor(visibility / 1000);

  const now = new Date().toISOString().slice(0, 13);
  const findex = weatherData.weatherData.time.findIndex((t) =>
    t.startsWith(now)
  );

  const zero = -45 + weatherData.currentWeather.winddirection;

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
        <p className="text-[8px]">
          {t("update")} {times}
        </p>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="w-full flex flex-col py-6 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-8xl">
            {WEATHER_CODE_DESCRIPTIONS[weatherData.currentWeather.weathercode]}
          </p>
          <div className="flex flex-row font-txtBold font-bold">
            <p className="text-8xl">
              {weatherData.currentWeather.temperature}°
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>
            {t("feeling")}
            {weatherData.weatherData.apparent_temperature[findex]}°
          </p>

          <p>
            {t("visibility")}
            {visibility_km}
            <span className="text-[8px]"> km</span>
          </p>
          <div className="flex flex-row items-center gap-1">
            <LuWind size={15} />
            <TiLocationArrow
              size={25}
              style={{
                transform: `rotate(${zero}deg)`,
              }}
              className="transition-transform"
            />
            <p>
              {weatherData.currentWeather.windspeed}{" "}
              <span className="text-[8px]">km/h</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-auto w-screen md:w-full py-4 ">
        <HourlyJsx
          weatherData={weatherData.weatherData}
          index={index}
          getDirection={getDirection}
          currentTime={currentTime}
          WEATHER_CODE_DESCRIPTIONS={WEATHER_CODE_DESCRIPTIONS}
        />
      </div>

      <div className="h-auto w-full py-4 ">
        <DailyJsx
          weatherDay={weatherData.weatherDay}
          getDirection={getDirection}
          WEATHER_CODE_DESCRIPTIONS={WEATHER_CODE_DESCRIPTIONS}
          currentTime={currentTime}
          i18n={i18n}
        />
      </div>
      <button onClick={updateCity} className="hidden">
        Update Localisation City
      </button>
    </>
  );
};

export default Weather;
