<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
    {
        public function show(Request $request)
        {
            $latitude = $request->input('lat');
            $longitude = $request->input('lon');
            $cityName = $request->input('name');

            if (!$latitude || !$longitude) {
                return response()->json([
                    'error' => 'Missing coordinates.'
                ], 400);
            }

            $client = new Client();

            try {
                $response = $client->get('https://api.open-meteo.com/v1/forecast', [
                    'verify' => false,
                    'query' => [
                        'latitude' => $latitude,
                        'longitude' => $longitude,
                        'timezone' => 'Europe/Zurich',

                        'hourly' => implode(',', [
                            'temperature_2m',
                            'rain',
                            'apparent_temperature',
                            'precipitation_probability',
                            'weather_code',
                            'wind_speed_10m',
                            'wind_direction_10m',
                            'visibility'
                        ]),
                        'daily' => implode(',', [
                            'temperature_2m_min',
                            'temperature_2m_max',
                            'apparent_temperature_min',
                            'apparent_temperature_max',
                            'precipitation_sum',
                            'precipitation_probability_max',
                            'wind_speed_10m_max',
                            'wind_gusts_10m_max',
                            'wind_direction_10m_dominant',
                            'weather_code'
                        ]),
                        'current_weather' => true


                    ]
                ]);

                $data = json_decode($response->getBody(), true);

                return response()->json([
                    'weatherData' => $data['hourly'],
                    'weatherDay' => $data['daily'],
                    'currentWeather' => $data['current_weather'],
                    'cityName' => $cityName
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Could not fetch weather data.'
                ], 500);
            }
        }
    }


