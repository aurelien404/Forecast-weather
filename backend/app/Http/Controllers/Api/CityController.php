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
            ->where('name', 'like', '%' . $query . '%')
            ->orderBy('population', 'desc')
            ->limit(20)
            ->get();

            return response()->json([
                'cities' => $cities,
                'query' => $query
            ]);
    }
}
