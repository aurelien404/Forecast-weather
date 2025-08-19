import { useEffect, useState } from "react";
import api from "../api";

import { useTranslation } from "react-i18next";

import HourlyJsx from "./Hourly_Weather";
import DailyJsx from "./Daily_Weather";

import { LuWind } from "react-icons/lu"; // wind logo
import { TiWeatherSnow } from "react-icons/ti"; // snowy

import { FaLocationCrosshairs } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";

import SunnyIco from "../assets/Clear-sky.svg?react";
import MainlyClearIco from "../assets/Mainly-clear.svg?react";
import PartlyCloudyIco from "../assets/Partly-cloudy.svg?react";
import OvercastIco from "../assets/Overcast.svg?react";

import SlightRainIco from "../assets/Slight-rain.svg?react";
import ModerateRainIco from "../assets/Moderate-rain.svg?react";
import HeavyRainIco from "../assets/Heavy-rain.svg?react";

import SlightRainShowersIco from "../assets/Slight-rain-showers.svg?react";
import ModerateRainShowersIco from "../assets/Moderate-rain-showers.svg?react";
import ViolentRainShowersIco from "../assets/Violent-rain-showers.svg?react";

import LightDrizzleIco from "../assets/Light-drizzle.svg?react";
import ModerateDrizzleIco from "../assets/Moderate-drizzle.svg?react";
import DenseDrizzleIco from "../assets/Dense-drizzle.svg?react";

import LightFreezingRainIco from "../assets/Light-freezing-rain.svg?react";
import HeavyFreezingRainIco from "../assets/Heavy-freezing-rain.svg?react";

import LightFreezingDrizzleIco from "../assets/Light-freezing-drizzle.svg?react";
import DenseFreezingDrizzleIco from "../assets/Dense-freezing-drizzle.svg?react";

import FogIco from "../assets/Fog.svg?react";
import DepositingRimeFogIco from "../assets/Depositing-rime-fog.svg?react";

import ThunderstormIco from "../assets/Thunderstorm.svg?react";
import LightThunderstormIco from "../assets/Thunderstorm-light.svg?react";
import HeavyThunderstormIco from "../assets/Thunderstorm-heavy.svg?react";

import SlightSnowShowersIco from "../assets/Slight-snow-showers.svg?react";
import HeavySnowShowersIco from "../assets/Heavy-snow-showers.svg?react";

import SlightSnowfallIco from "../assets/Slight-snowfall.svg?react";
import ModerateSnowfallIco from "../assets/Moderate-snowfall.svg?react";
import HeavySnowfallIco from "../assets/Heavy-snowfall.svg?react";

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
    0: <SunnyIco />,
    1: <MainlyClearIco />,
    2: <PartlyCloudyIco />,
    3: <OvercastIco />,

    // 🌫️ Fog & Atmospheric
    45: <FogIco />,
    48: <DepositingRimeFogIco />,

    // 🌧️ Drizzle
    51: <LightDrizzleIco />,
    53: <ModerateDrizzleIco />,
    55: <DenseDrizzleIco />,
    56: <LightFreezingDrizzleIco />,
    57: <DenseFreezingDrizzleIco />,

    // 🌧️ Rain
    61: <SlightRainIco />,
    63: <ModerateRainIco />,
    65: <HeavyRainIco />,
    66: <LightFreezingRainIco />,
    67: <HeavyFreezingRainIco />,

    // ❄️ Snow
    71: <SlightSnowfallIco />,
    73: <ModerateSnowfallIco />,
    75: <HeavySnowfallIco />,
    77: <SlightSnowfallIco />,

    // 🌦️ Rain Showers
    80: <SlightRainShowersIco />,
    81: <ModerateRainShowersIco />,
    82: <ViolentRainShowersIco />,

    // ❄️ Snow Showers
    85: <SlightSnowShowersIco />,
    86: <HeavySnowShowersIco />,

    // ⛈️ Thunderstorms
    95: <ThunderstormIco />,
    96: <LightThunderstormIco />,
    99: <HeavyThunderstormIco />,
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
          <p className="h-40">
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
