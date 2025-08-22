<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\CityController;

Route::get('/weather', [WeatherController::class, 'show']);
Route::get('/cities/search', [CityController::class, 'search']);
Route::get('/city/reverse', [CityController::class, 'reverseLookup']);

