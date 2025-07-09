# Weather Forecast App

A lightweight weather forecast application built with React & Laravel, pulling real-time data from public APIs.

## Project Status

**This project is currently under construction.**  
Features and documentation are actively being built—stay tuned for updates and new releases!

Feel free to fork, explore, or contribute if you're feeling adventurous.

## Development Steps

- [x] Project initialized
- [x] React frontend scaffolded with Vite
- [x] Tailwind CSS integrated
- [x] Laravel backend configured
- [x] City data parsed from GeoNames
- [ ] Weather API responses formatted
- [ ] Display components for forecast data
- [ ] ...

## Data Sources

### Tools

- **Weather API:**  
  [Open-Meteo](https://open-meteo.com/en/docs) — Free weather data with hourly/daily forecasts.

- **City Database:**  
  [GeoNames Dump](https://download.geonames.org/export/dump/) — City listings with latitude/longitude data.

- **Weather Icons:**  
  [React Icons](https://react-icons.github.io/react-icons/) — Beautiful icon sets for weather conditions.

### Docs

- **Open-Meteo docs:**  
  [0penmete0.md](https://github.com/aurelien404/Forecast-weather/blob/main/Docs/0penmete0.md) — Personnal docs about Open Meteo Api.

## Features

- Search by city name
- Fetch current + 7-day forecasts
- Uses GeoNames for location lookup
- Stylish icons with React Icons
- React frontend with tailwindcss
- Laravel backend with RESTful endpoints

## Installation

# Clone the project

```bash
git clone https://github.com/your-username/laravel-weather-app.git
```

# Install and run backend

```bash
cd Forecast-App/backend
composer install && cp .env.example .env && php artisan key:generate && php artisan serve
```

# Install and run frontend

```bash
cd ../frontend
npm install && npm run dev
```
