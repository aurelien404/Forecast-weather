//Daily.jsx
import { useTranslation } from "react-i18next";

import { TbTemperatureMinus } from "react-icons/tb";
import { TbTemperaturePlus } from "react-icons/tb";
import { FaWind } from "react-icons/fa6";
import { BsCloudRain } from "react-icons/bs";
import { TiLocationArrow } from "react-icons/ti";
import { IoStatsChart } from "react-icons/io5";

const Daily = ({
  weatherDay,
  getDirection,
  WEATHER_CODE_DESCRIPTIONS,
  currentTime,
  i18n,
}) => {
  const { t } = useTranslation();
  const lang = i18n;

  const forecast = Array.from({ length: 7 }, (_, i) => i); // 0 to 6
  const currentDay = `${currentTime.getUTCFullYear()}-${String(
    currentTime.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(currentTime.getUTCDate()).padStart(2, "0")}`;
  const startDate = new Date(currentDay);

  return (
    <div className="overflow-scroll">
      <div className="flex flex-col gap-2 w-full">
        {forecast.map((index) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + index);

          let dayMonth = date.toLocaleDateString(
            lang === "en" ? "en-GB" : "fr-FR",
            {
              weekday: "short",
            }
          );

          if (index === 0) {
            dayMonth = t("now");
          }
          const zero = -45 + weatherDay.wind_direction_10m_dominant[index];

          return (
            <div
              key={index}
              className="w-full h-auto p-2 flex flex-row items-center justify-around gap-2 md:gap-4 bg-opabase rounded"
            >
              <div className="w-1/6 flex items-center px-2 text-base font-bold">
                <h4>{dayMonth}</h4>
              </div>
              <div className="w-1/6 flex flex-row items-center justify-center md:px-2 h-9">
                {WEATHER_CODE_DESCRIPTIONS[weatherDay.weather_code[index]]}
              </div>
              <div className="w-2/8 grid grid-cols-3 grid-rows-2 gap-x-2 md:px-2 items-center text-sm">
                <TbTemperatureMinus />
                <p className="col-span-2">
                  {weatherDay.temperature_2m_min[index]}°
                </p>
                <TbTemperaturePlus />
                <p className="col-span-2">
                  {weatherDay.temperature_2m_max[index]}°
                </p>
              </div>

              <div className="w-2/8 grid grid-cols-3 grid-rows-2 gap-x-2 md:px-2 items-center text-sm">
                <BsCloudRain />
                <p className="col-span-2">
                  {weatherDay.precipitation_probability_max[index]}
                  <span className="text-[8px]">%</span>
                </p>
                <IoStatsChart />
                <p className="col-span-2">
                  {weatherDay.precipitation_sum[index]}
                  <span className="text-[8px]">mm</span>
                </p>
              </div>

              <div className="w-2/8 flex flex-col gap-1 md:px-2 items-center text-sm">
                <FaWind className="hidden" />
                <p>
                  {weatherDay.wind_speed_10m_max[index]}
                  <span className="text-[8px]">km/h</span>
                </p>
                <p>
                  {weatherDay.wind_gusts_10m_max[index]}
                  <span className="text-[8px]">km/h</span>
                </p>
              </div>
              <div className="w-1/8 flex flex-col gap-1 md:px-2 items-center text-sm">
                <TiLocationArrow
                  style={{
                    transform: `rotate(${zero}deg)`,
                  }}
                  className="transition-transform"
                />
                {getDirection(weatherDay.wind_direction_10m_dominant[index])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
