<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CityController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $cities = DB::table('cities')
            ->select('name', 'country_code', DB::raw('MIN(latitude) as latitude'), DB::raw('MIN(longitude) as longitude'))
            ->where('name', 'like', '%' . $query . '%')
            ->groupBy('name', 'country_code') // group by name + country code
            ->orderByDesc('population')
            ->limit(20)
            ->get();


            return response()->json([
                'cities' => $cities,
                'query' => $query
            ]);
    }

    public function reverseLookup(Request $request)
    {
        $lat = $request->input('lat');
        $lng = $request->input('lng');

        // Find the nearest city using Haversine formula
        $city = DB::table('cities')
            ->select('name', 'country_code', 'latitude', 'longitude',
                DB::raw("(
                    6371 * acos(
                        cos(radians(?)) *
                        cos(radians(latitude)) *
                        cos(radians(longitude) - radians(?)) +
                        sin(radians(?)) *
                        sin(radians(latitude))
                    )
                ) AS distance"))
            ->setBindings([$lat, $lng, $lat])
            ->orderBy('distance')
            ->limit(1)
            ->first();

        return response()->json([
            'city' => $city,
            'coordinates' => ['lat' => $lat, 'lng' => $lng]
        ]);
    }
}
