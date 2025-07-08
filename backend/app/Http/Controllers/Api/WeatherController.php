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
                    'current_weather' => true,
                    'timezone' => 'Europe/Zurich'
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            return response()->json([
                'weatherData' => $data['current_weather'],
                'cityName' => $cityName
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Could not fetch weather data.'
            ], 500);
        }
    }
}


