# Weather Forecast App

A lightweight weather forecast application built with React & Laravel, pulling real-time data from public APIs.

## Project Status

**This project is currently under construction.**  
Features and documentation are actively being built—stay tuned for updates and new releases!

Feel free to fork, explore, or contribute if you're feeling adventurous.

## 🛠️ Development Steps

- [x] Project initialized
- [x] React frontend scaffolded with Vite
- [x] Tailwind CSS integrated

- [ ] Laravel backend configured
- [ ] City data parsed from GeoNames
- [ ] Weather API responses formatted
- [ ] Display components for forecast data
- [ ] ...

## 🔗 Data Sources

- **Weather API:**  
  [Open-Meteo](https://open-meteo.com/en/docs) — Free weather data with hourly/daily forecasts.

- **City Database:**  
  [GeoNames Dump](https://download.geonames.org/export/dump/) — City listings with latitude/longitude data.

- **Weather Icons:**  
  [React Icons](https://react-icons.github.io/react-icons/) — Beautiful icon sets for weather conditions.

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
