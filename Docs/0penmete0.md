### 🌡️ Open-Meteo `minutely_15` Variables

| Variable               | Description                              |
| ---------------------- | ---------------------------------------- |
| `temperature_2m`       | Air temperature at 2 meters above ground |
| `relative_humidity_2m` | Humidity at 2 meters                     |
| `dew_point_2m`         | Dew point temperature                    |
| `apparent_temperature` | Feels-like temperature                   |
| `precipitation`        | Rain + showers + snow                    |
| `rain`                 | Rain only                                |
| `showers`              | Showers only                             |
| `snowfall`             | Snowfall amount                          |
| `snow_depth`           | Snow accumulation                        |
| `weather_code`         | Coded weather condition                  |
| `cloud_cover`          | Total cloud cover                        |
| `cloud_cover_low`      | Low-altitude cloud cover                 |
| `cloud_cover_mid`      | Mid-altitude cloud cover                 |
| `cloud_cover_high`     | High-altitude cloud cover                |
| `wind_speed_10m`       | Wind speed at 10 meters                  |
| `wind_speed_80m`       | Wind speed at 80 meters                  |
| `wind_speed_120m`      | Wind speed at 120 meters                 |
| `wind_speed_180m`      | Wind speed at 180 meters                 |
| `wind_direction_10m`   | Wind direction at 10 meters              |
| `wind_direction_80m`   | Wind direction at 80 meters              |
| `wind_direction_120m`  | Wind direction at 120 meters             |
| `wind_direction_180m`  | Wind direction at 180 meters             |
| `wind_gusts_10m`       | Wind gusts at 10 meters                  |
| `solar_radiation`      | Instantaneous solar radiation            |
| `visibility`           | Horizontal visibility                    |
| `pressure_msl`         | Mean sea level pressure                  |
| `surface_pressure`     | Surface pressure                         |

### Backend - WeatherController.php

```php


$response = $client->get('https://api.open-meteo.com/v1/forecast', [
    'verify' => false,
    'query' => [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'timezone' => 'Europe/Zurich',
        'minutely_15' => implode(',', [
            'temperature_2m',
            'relative_humidity_2m',
            'dew_point_2m',
            'apparent_temperature',
            'precipitation',
            'rain',
            'showers',
            'snowfall',
            'snow_depth',
            'weather_code',
            'cloud_cover',
            'cloud_cover_low',
            'cloud_cover_mid',
            'cloud_cover_high',
            'wind_speed_10m',
            'wind_speed_80m',
            'wind_speed_120m',
            'wind_speed_180m',
            'wind_direction_10m',
            'wind_direction_80m',
            'wind_direction_120m',
            'wind_direction_180m',
            'wind_gusts_10m',
            'solar_radiation',
            'visibility',
            'pressure_msl',
            'surface_pressure'
        ]),
        'start_date' => $today,
        'end_date' => $today
    ]
]);

```

### Frontend - Weather.jsx

```js
import React, { useEffect, useState } from "react";

const WeatherDisplay = () => {
  const [currentTemp, setCurrentTemp] = useState(null);
  const [nextFive, setNextFive] = useState([]);

  useEffect(() => {
    fetch("your-api-endpoint-here") // Replace with actual backend API or Open-Meteo proxy
      .then((res) => res.json())
      .then((data) => {
        // Current temperature
        setCurrentTemp(data.current_weather.temperature);

        // Hourly temps and times
        const hourlyTemps = data.hourly.temperature_2m;
        const hourlyTimes = data.hourly.time;
        const currentTime = data.current_weather.time;

        // Find index of current hour
        const currentIndex = hourlyTimes.indexOf(currentTime);

        // Slice next 5 entries
        const nextTemps = hourlyTemps.slice(currentIndex + 1, currentIndex + 6);
        const nextTimes = hourlyTimes.slice(currentIndex + 1, currentIndex + 6);

        const forecast = nextTemps.map((temp, i) => ({
          time: nextTimes[i],
          temp,
        }));

        setNextFive(forecast);
      });
  }, []);

  return (
    <div>
      <h2>🌡️ Current Temperature: {currentTemp}°C</h2>
      <h3>Next 5 Hours:</h3>
      <ul>
        {nextFive.map((entry, idx) => (
          <li key={idx}>
            At{" "}
            {new Date(entry.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            → {entry.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
```
