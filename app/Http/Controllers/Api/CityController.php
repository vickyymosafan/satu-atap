<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CityController extends Controller
{
    /**
     * Get all cities with optional filtering and search
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = City::active();

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $query->search($request->search);
            }

            // Filter by province
            if ($request->has('province') && !empty($request->province)) {
                $query->byProvince($request->province);
            }

            // Filter by type
            if ($request->has('type') && !empty($request->type)) {
                $query->byType($request->type);
            }

            // Filter popular cities only
            if ($request->boolean('popular_only')) {
                $query->popular();
            }

            // Unique cities only (group by city name)
            if ($request->boolean('unique_only')) {
                $cities = $query->select('city', 'province')
                    ->groupBy('city', 'province')
                    ->orderBy('city')
                    ->get()
                    ->map(function ($city) {
                        return [
                            'id' => $city->city,
                            'name' => $city->city,
                            'city' => $city->city,
                            'province' => $city->province,
                            'type' => 'city',
                            'full_name' => "{$city->city}, {$city->province}"
                        ];
                    });

                return response()->json([
                    'success' => true,
                    'data' => $cities,
                    'total' => $cities->count(),
                    'message' => 'Cities retrieved successfully'
                ]);
            }

            // Apply ordering
            $query->ordered();

            // Pagination
            $limit = $request->get('limit', 50);
            $limit = min($limit, 100); // Max 100 items per request

            if ($request->boolean('paginate')) {
                $cities = $query->paginate($limit);
                
                return response()->json([
                    'success' => true,
                    'data' => $cities->items(),
                    'pagination' => [
                        'current_page' => $cities->currentPage(),
                        'last_page' => $cities->lastPage(),
                        'per_page' => $cities->perPage(),
                        'total' => $cities->total(),
                        'from' => $cities->firstItem(),
                        'to' => $cities->lastItem(),
                    ],
                    'message' => 'Cities retrieved successfully'
                ]);
            } else {
                $cities = $query->limit($limit)->get();
                
                return response()->json([
                    'success' => true,
                    'data' => $cities,
                    'total' => $cities->count(),
                    'message' => 'Cities retrieved successfully'
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve cities',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get autocomplete suggestions for cities
     */
    public function autocomplete(Request $request): JsonResponse
    {
        try {
            $search = $request->get('search', '');
            $limit = min($request->get('limit', 10), 20); // Max 20 suggestions

            if (empty($search)) {
                // Return popular cities when no search term
                $cities = City::active()
                    ->popular()
                    ->ordered()
                    ->limit($limit)
                    ->get();
            } else {
                // Search cities
                $cities = City::autocomplete($search, $limit);
            }

            $suggestions = $cities->map(function ($city) {
                return [
                    'id' => $city->id,
                    'name' => $city->name,
                    'city' => $city->city,
                    'province' => $city->province,
                    'type' => $city->type,
                    'full_name' => $city->full_name,
                    'is_popular' => $city->is_popular
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $suggestions,
                'total' => $suggestions->count(),
                'message' => 'Autocomplete suggestions retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get autocomplete suggestions',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get all provinces
     */
    public function provinces(): JsonResponse
    {
        try {
            $provinces = City::getProvinces();

            return response()->json([
                'success' => true,
                'data' => $provinces,
                'total' => $provinces->count(),
                'message' => 'Provinces retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve provinces',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get popular cities
     */
    public function popular(): JsonResponse
    {
        try {
            $cities = City::active()
                ->popular()
                ->ordered()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $cities,
                'total' => $cities->count(),
                'message' => 'Popular cities retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve popular cities',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get unique cities (grouped by city name)
     */
    public function unique(): JsonResponse
    {
        try {
            $cities = City::getUniqueCities();

            $uniqueCities = $cities->map(function ($city) {
                return [
                    'id' => $city->city,
                    'name' => $city->city,
                    'city' => $city->city,
                    'province' => $city->province,
                    'type' => 'city',
                    'full_name' => "{$city->city}, {$city->province}"
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $uniqueCities,
                'total' => $uniqueCities->count(),
                'message' => 'Unique cities retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve unique cities',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get a specific city by ID
     */
    public function show(City $city): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $city,
                'message' => 'City retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve city',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
