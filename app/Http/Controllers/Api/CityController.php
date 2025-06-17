<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\KostProperty;
use App\Models\KostLocation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Builder;

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
                $transformedCities = $this->transformCitiesWithStats($cities->items(), $request->boolean('include_stats'));

                return response()->json([
                    'success' => true,
                    'data' => $transformedCities,
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
                $transformedCities = $this->transformCitiesWithStats($cities, $request->boolean('include_stats'));

                return response()->json([
                    'success' => true,
                    'data' => $transformedCities,
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
    public function popular(Request $request): JsonResponse
    {
        try {
            $cities = City::active()
                ->popular()
                ->ordered()
                ->get();

            $transformedCities = $this->transformCitiesWithStats($cities, $request->boolean('include_stats'));

            return response()->json([
                'success' => true,
                'data' => $transformedCities,
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
     * Get a specific city by ID with detailed statistics
     */
    public function show(City $city, Request $request): JsonResponse
    {
        try {
            $includeStats = $request->boolean('include_stats', true);
            $transformedCity = $this->transformCityWithStats($city, $includeStats);

            return response()->json([
                'success' => true,
                'data' => $transformedCity,
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

    /**
     * Get cities with property statistics
     */
    public function withStats(Request $request): JsonResponse
    {
        try {
            $query = City::active();

            // Apply filters
            if ($request->has('search') && !empty($request->search)) {
                $query->search($request->search);
            }

            if ($request->has('province') && !empty($request->province)) {
                $query->byProvince($request->province);
            }

            if ($request->boolean('popular_only')) {
                $query->popular();
            }

            $cities = $query->ordered()->get();
            $transformedCities = $this->transformCitiesWithStats($cities, true);

            // Sort by property count if requested
            if ($request->get('sort_by') === 'property_count') {
                $transformedCities = $transformedCities->sortByDesc('property_count')->values();
            }

            return response()->json([
                'success' => true,
                'data' => $transformedCities,
                'total' => $cities->count(),
                'message' => 'Cities with statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve cities with statistics',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get city statistics summary
     */
    public function statistics(): JsonResponse
    {
        try {
            $totalCities = City::active()->count();
            $popularCities = City::active()->popular()->count();
            $totalProvinces = City::active()->distinct('province')->count('province');

            // Property statistics by city
            $citiesWithProperties = KostLocation::select('city')
                ->distinct()
                ->count();

            $avgPropertiesPerCity = $citiesWithProperties > 0
                ? KostProperty::count() / $citiesWithProperties
                : 0;

            // Top cities by property count
            $topCities = KostLocation::select('city', 'province')
                ->selectRaw('COUNT(*) as property_count')
                ->groupBy('city', 'province')
                ->orderBy('property_count', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => [
                        'total_cities' => $totalCities,
                        'popular_cities' => $popularCities,
                        'total_provinces' => $totalProvinces,
                        'cities_with_properties' => $citiesWithProperties,
                        'avg_properties_per_city' => round($avgPropertiesPerCity, 2),
                    ],
                    'top_cities' => $topCities,
                ],
                'message' => 'City statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve city statistics',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Transform cities collection with optional statistics
     */
    private function transformCitiesWithStats($cities, bool $includeStats = false)
    {
        return collect($cities)->map(function ($city) use ($includeStats) {
            return $this->transformCityWithStats($city, $includeStats);
        });
    }

    /**
     * Transform single city with optional statistics
     */
    private function transformCityWithStats(City $city, bool $includeStats = false): array
    {
        $transformed = [
            'id' => (string) $city->id,
            'name' => $city->name,
            'city' => $city->city,
            'province' => $city->province,
            'type' => $city->type,
            'full_name' => $city->full_name,
            'is_popular' => $city->is_popular,
            'sort_order' => $city->sort_order,
            'latitude' => $city->latitude,
            'longitude' => $city->longitude,
        ];

        if ($includeStats) {
            // Get property statistics for this city
            $propertyCount = KostProperty::whereHas('location', function ($query) use ($city) {
                $query->where('city', $city->city);
            })->count();

            $featuredCount = KostProperty::whereHas('location', function ($query) use ($city) {
                $query->where('city', $city->city);
            })->where('is_featured', true)->count();

            $verifiedCount = KostProperty::whereHas('location', function ($query) use ($city) {
                $query->where('city', $city->city);
            })->where('is_verified', true)->count();

            $avgPrice = KostProperty::whereHas('location', function ($query) use ($city) {
                $query->where('city', $city->city);
            })->avg('price_monthly');

            $priceRange = KostProperty::whereHas('location', function ($query) use ($city) {
                $query->where('city', $city->city);
            })->selectRaw('MIN(price_monthly) as min_price, MAX(price_monthly) as max_price')
            ->first();

            $transformed['statistics'] = [
                'property_count' => $propertyCount,
                'featured_count' => $featuredCount,
                'verified_count' => $verifiedCount,
                'avg_price' => $avgPrice ? round($avgPrice) : null,
                'min_price' => $priceRange->min_price ?? null,
                'max_price' => $priceRange->max_price ?? null,
            ];
        }

        return $transformed;
    }
}
