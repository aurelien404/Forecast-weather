//Daily.jsx

const Daily = ({
  weatherDay,
  getDirection,
  WEATHER_CODE_DESCRIPTIONS,
  currentTime,
}) => {
  const forecast = Array.from({ length: 6 }, (_, i) => i); // 0 to 6
  const currentDay = `${currentTime.getUTCFullYear()}-${String(
    currentTime.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(currentTime.getUTCDate()).padStart(2, "0")}`;
  const startDate = new Date(currentDay);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="overflow-scroll">
      <div className="flex flex-col gap-2 w-full">
        {forecast.map((n) => {
          const index = n + 1;
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + index);

          const dayMonth = date.toLocaleDateString("en-GB", {
            weekday: "short", // gives Mon, Tue, etc.
            day: "2-digit",
          });

          return (
            <div key={n} className="w-full p-4 flex flex-col bg-red-500">
              {dayMonth}
              <p>{WEATHER_CODE_DESCRIPTIONS[weatherDay.weather_code[index]]}</p>
              <p>
                Temp: {weatherDay.temperature_2m_min[index]}° /{" "}
                {weatherDay.temperature_2m_max[index]}°
              </p>
              <p>
                FeelL: {weatherDay.apparent_temperature_min[index]}° /{" "}
                {weatherDay.apparent_temperature_max[index]}°
              </p>
              <p>Rain: {weatherDay.precipitation_sum[index]} mm</p>
              <p>
                Max Rain: {weatherDay.precipitation_probability_max[index]} mm
              </p>
              <p>
                Wind/Gust: {weatherDay.wind_speed_10m_max[index]} kmh /
                {weatherDay.wind_gusts_10m_max[index]} kmh
              </p>
              <p>
                Wind Dir:{" "}
                {getDirection(weatherDay.wind_direction_10m_dominant[index])}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
