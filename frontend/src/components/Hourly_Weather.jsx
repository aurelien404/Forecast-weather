// Hourly.jsx
import React from "react";
import { BsCloudRain } from "react-icons/bs";
import { TiLocationArrow } from "react-icons/ti";

const Hourly = ({
  weatherData,
  index,
  currentTime,
  WEATHER_CODE_DESCRIPTIONS,
}) => {
  const forecast = Array.from({ length: 12 }, (_, i) => i + 1);
  const baseHour = currentTime.getHours();

  return (
    <div className="overflow-scroll">
      <div className="pr-20 md:pr-4 py-3 md:py-8 w-[250vw] md:w-[100vw] flex flex-row justify-center items-center gap-1">
        {forecast.map((n) => {
          const hour = String((baseHour + n) % 24).padStart(2, "0");
          const i = index + n;

          const zero = -45 + weatherData.wind_direction_10m[i];

          return (
            <div
              key={i}
              className="w-2/12 md:w-1/12 h-full flex flex-col items-center"
            >
              <p className="font-txtBold font-bold pb-2">{hour}:00</p>
              <p className="text-2xl">
                {WEATHER_CODE_DESCRIPTIONS[weatherData.weather_code[i]]}
              </p>
              <p className="flex flex-row items-center text-xl md:text-xl font-txtBold font-bold">
                {weatherData.temperature_2m[i]}°
              </p>
              <div className="flex flex-row items-center">
                <TiLocationArrow
                  size={15}
                  style={{
                    transform: `rotate(${zero}deg)`,
                  }}
                  className="mx-1 transition-transform"
                />
                <p>{weatherData.wind_speed_10m[i]}</p>
                <span className="text-[8px]">km/h</span>
              </div>
              <p className="flex flex-row items-center gap-3 font-txtBold text-xs font-bold">
                <BsCloudRain />
                {weatherData.precipitation_probability[i]}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hourly;
