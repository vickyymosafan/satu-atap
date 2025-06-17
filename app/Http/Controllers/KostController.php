<?php

namespace App\Http\Controllers;

use App\Models\KostProperty;
use App\Models\KostLocation;
use App\Models\KostAmenity;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Builder;

class KostController extends Controller
{
    /**
     * Get featured properties for the landing page.
     */
    public function getFeatured(): JsonResponse
    {
        try {
            $properties = KostProperty::with([
                'location',
                'images' => function ($query) {
                    $query->orderBy('order');
                },
                'amenities'
            ])
            ->featured()
            ->orderBy('rating', 'desc')
            ->get();

            // Transform the data to match the frontend interface
            $transformedProperties = $properties->map(function ($property) {
                return [
                    'id' => (string) $property->id,
                    'title' => $property->title,
                    'description' => $property->description,
                    'price_monthly' => $property->price_monthly,
                    'price_daily' => $property->price_daily,
                    'property_type' => $property->property_type,
                    'room_type' => $property->room_type,
                    'available_rooms' => $property->available_rooms,
                    'total_rooms' => $property->total_rooms,
                    'images' => $property->images->map(function ($image) {
                        return [
                            'id' => (string) $image->id,
                            'url' => $image->full_url,
                            'alt' => $image->alt,
                            'is_primary' => $image->is_primary,
                            'order' => $image->order,
                        ];
                    }),
                    'amenities' => $property->amenities->map(function ($amenity) {
                        return [
                            'id' => (string) $amenity->id,
                            'name' => $amenity->name,
                            'icon' => $amenity->icon,
                            'category' => $amenity->category,
                            'is_popular' => $amenity->is_popular,
                        ];
                    }),
                    'location' => [
                        'id' => (string) $property->location->id,
                        'address' => $property->location->address,
                        'district' => $property->location->district,
                        'city' => $property->location->city,
                        'province' => $property->location->province,
                        'postal_code' => $property->location->postal_code,
                        'latitude' => $property->location->latitude,
                        'longitude' => $property->location->longitude,
                        'nearby_landmarks' => $property->location->nearby_landmarks,
                    ],
                    'rating' => (float) $property->rating,
                    'review_count' => $property->review_count,
                    'is_featured' => $property->is_featured,
                    'is_verified' => $property->is_verified,
                    'owner' => [
                        'id' => (string) $property->id, // Use property ID as owner ID for now
                        'name' => $property->owner_name,
                        'avatar' => $property->owner_avatar,
                        'phone' => $property->owner_phone,
                        'response_rate' => $property->owner_response_rate,
                        'response_time' => $property->owner_response_time,
                    ],
                    'rules' => $property->rules ?? [],
                    'facilities' => $property->facilities ?? [],
                    'created_at' => $property->created_at->toISOString(),
                    'updated_at' => $property->updated_at->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedProperties,
                'message' => 'Featured properties retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured properties',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search properties with filters.
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $query = KostProperty::with([
                'location',
                'images' => function ($query) {
                    $query->orderBy('order');
                },
                'amenities'
            ]);

            // Location-based search (city, district, province, or address)
            if ($request->has('location') && $request->location) {
                $location = $request->location;
                $query->whereHas('location', function ($q) use ($location) {
                    $q->where('city', 'like', '%' . $location . '%')
                      ->orWhere('district', 'like', '%' . $location . '%')
                      ->orWhere('province', 'like', '%' . $location . '%')
                      ->orWhere('address', 'like', '%' . $location . '%');
                });
            }

            // Legacy city filter for backward compatibility
            if ($request->has('city') && $request->city) {
                $query->whereHas('location', function ($q) use ($request) {
                    $q->where('city', 'like', '%' . $request->city . '%');
                });
            }

            // Property type filter
            if ($request->has('property_type') && $request->property_type) {
                $query->where('property_type', $request->property_type);
            }

            // Price range filters
            if ($request->has('min_price') && $request->min_price) {
                $query->where('price_monthly', '>=', $request->min_price);
            }

            if ($request->has('max_price') && $request->max_price) {
                $query->where('price_monthly', '<=', $request->max_price);
            }

            // Amenities filter - support both ID and icon-based filtering
            if ($request->has('amenities') && is_array($request->amenities) && !empty($request->amenities)) {
                $amenities = $request->amenities;
                $query->whereHas('amenities', function ($q) use ($amenities) {
                    // Check if amenities are numeric IDs or icon strings
                    if (is_numeric($amenities[0])) {
                        $q->whereIn('kost_amenities.id', $amenities);
                    } else {
                        $q->whereIn('kost_amenities.icon', $amenities);
                    }
                }, '>=', count($amenities));
            }

            // Room availability filter
            if ($request->has('available_only') && $request->available_only) {
                $query->where('available_rooms', '>', 0);
            }

            // Verified properties filter
            if ($request->has('verified_only') && $request->verified_only) {
                $query->where('is_verified', true);
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'rating');
            $sortOrder = $request->get('sort_order', 'desc');

            switch ($sortBy) {
                case 'price_low':
                    $query->orderBy('price_monthly', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price_monthly', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'rating':
                default:
                    $query->orderBy('rating', 'desc');
                    break;
            }

            $perPage = $request->get('per_page', 12);
            $properties = $query->paginate($perPage);

            // Transform the data to match the frontend interface
            $transformedProperties = $properties->getCollection()->map(function ($property) {
                return [
                    'id' => (string) $property->id,
                    'title' => $property->title,
                    'description' => $property->description,
                    'price_monthly' => $property->price_monthly,
                    'price_daily' => $property->price_daily,
                    'property_type' => $property->property_type,
                    'room_type' => $property->room_type,
                    'available_rooms' => $property->available_rooms,
                    'total_rooms' => $property->total_rooms,
                    'images' => $property->images->map(function ($image) {
                        return [
                            'id' => (string) $image->id,
                            'url' => $image->full_url,
                            'alt' => $image->alt,
                            'is_primary' => $image->is_primary,
                            'order' => $image->order,
                        ];
                    }),
                    'amenities' => $property->amenities->map(function ($amenity) {
                        return [
                            'id' => (string) $amenity->id,
                            'name' => $amenity->name,
                            'icon' => $amenity->icon,
                            'category' => $amenity->category,
                            'is_popular' => $amenity->is_popular,
                        ];
                    }),
                    'location' => [
                        'id' => (string) $property->location->id,
                        'address' => $property->location->address,
                        'district' => $property->location->district,
                        'city' => $property->location->city,
                        'province' => $property->location->province,
                        'postal_code' => $property->location->postal_code,
                        'latitude' => $property->location->latitude,
                        'longitude' => $property->location->longitude,
                        'nearby_landmarks' => $property->location->nearby_landmarks,
                    ],
                    'rating' => (float) $property->rating,
                    'review_count' => $property->review_count,
                    'is_featured' => $property->is_featured,
                    'is_verified' => $property->is_verified,
                    'owner' => [
                        'id' => (string) $property->id, // Use property ID as owner ID for now
                        'name' => $property->owner_name,
                        'avatar' => $property->owner_avatar,
                        'phone' => $property->owner_phone,
                        'response_rate' => $property->owner_response_rate,
                        'response_time' => $property->owner_response_time,
                    ],
                    'rules' => $property->rules ?? [],
                    'facilities' => $property->facilities ?? [],
                    'created_at' => $property->created_at->toISOString(),
                    'updated_at' => $property->updated_at->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedProperties,
                'pagination' => [
                    'current_page' => $properties->currentPage(),
                    'last_page' => $properties->lastPage(),
                    'per_page' => $properties->perPage(),
                    'total' => $properties->total(),
                    'from' => $properties->firstItem(),
                    'to' => $properties->lastItem(),
                ],
                'filters' => [
                    'location' => $request->location,
                    'city' => $request->city,
                    'property_type' => $request->property_type,
                    'min_price' => $request->min_price,
                    'max_price' => $request->max_price,
                    'amenities' => $request->amenities,
                    'sort_by' => $sortBy,
                    'sort_order' => $sortOrder,
                ],
                'message' => 'Properties retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search properties',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get location suggestions for autocomplete.
     */
    public function getLocationSuggestions(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q', '');
            $limit = $request->get('limit', 10);

            if (empty($query)) {
                // Return popular cities from our City model when no query
                $popularCities = City::popular()
                    ->active()
                    ->ordered()
                    ->limit($limit)
                    ->get()
                    ->map(function ($city) {
                        return [
                            'id' => (string) $city->id,
                            'name' => $city->name,
                            'city' => $city->city,
                            'province' => $city->province,
                            'type' => $city->type,
                            'full_name' => $city->full_name,
                            'is_popular' => $city->is_popular,
                        ];
                    });

                return response()->json([
                    'success' => true,
                    'data' => $popularCities,
                    'message' => 'Popular cities retrieved successfully'
                ]);
            }

            // Search cities using our City model
            $cities = City::active()
                ->search($query)
                ->ordered()
                ->limit($limit)
                ->get()
                ->map(function ($city) {
                    return [
                        'id' => (string) $city->id,
                        'name' => $city->name,
                        'city' => $city->city,
                        'province' => $city->province,
                        'type' => $city->type,
                        'full_name' => $city->full_name,
                        'is_popular' => $city->is_popular,
                    ];
                });

            // Also search in KostLocation for districts and specific addresses
            $locations = KostLocation::where('city', 'like', '%' . $query . '%')
                ->orWhere('district', 'like', '%' . $query . '%')
                ->orWhere('province', 'like', '%' . $query . '%')
                ->orWhere('address', 'like', '%' . $query . '%')
                ->limit($limit)
                ->get()
                ->map(function ($location) {
                    return [
                        'id' => 'location_' . $location->id,
                        'name' => $location->district,
                        'city' => $location->city,
                        'province' => $location->province,
                        'type' => 'district',
                        'full_name' => $location->district . ', ' . $location->city . ', ' . $location->province,
                        'is_popular' => false,
                        'address' => $location->address,
                        'nearby_landmarks' => $location->nearby_landmarks,
                    ];
                });

            // Combine and deduplicate results
            $allSuggestions = $cities->concat($locations)
                ->unique('full_name')
                ->take($limit)
                ->values();

            return response()->json([
                'success' => true,
                'data' => $allSuggestions,
                'message' => 'Location suggestions retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get location suggestions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get property details by ID.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $property = KostProperty::with([
                'location',
                'images' => function ($query) {
                    $query->orderBy('order');
                },
                'amenities'
            ])->findOrFail($id);

            $transformedProperty = [
                'id' => (string) $property->id,
                'title' => $property->title,
                'description' => $property->description,
                'price_monthly' => $property->price_monthly,
                'price_daily' => $property->price_daily,
                'property_type' => $property->property_type,
                'room_type' => $property->room_type,
                'available_rooms' => $property->available_rooms,
                'total_rooms' => $property->total_rooms,
                'images' => $property->images->map(function ($image) {
                    return [
                        'id' => (string) $image->id,
                        'url' => $image->full_url,
                        'alt' => $image->alt,
                        'is_primary' => $image->is_primary,
                        'order' => $image->order,
                    ];
                }),
                'amenities' => $property->amenities->map(function ($amenity) {
                    return [
                        'id' => (string) $amenity->id,
                        'name' => $amenity->name,
                        'icon' => $amenity->icon,
                        'category' => $amenity->category,
                        'is_popular' => $amenity->is_popular,
                    ];
                }),
                'location' => [
                    'id' => (string) $property->location->id,
                    'address' => $property->location->address,
                    'district' => $property->location->district,
                    'city' => $property->location->city,
                    'province' => $property->location->province,
                    'postal_code' => $property->location->postal_code,
                    'latitude' => $property->location->latitude,
                    'longitude' => $property->location->longitude,
                    'nearby_landmarks' => $property->location->nearby_landmarks,
                ],
                'rating' => (float) $property->rating,
                'review_count' => $property->review_count,
                'is_featured' => $property->is_featured,
                'is_verified' => $property->is_verified,
                'owner' => [
                    'id' => (string) $property->id,
                    'name' => $property->owner_name,
                    'avatar' => $property->owner_avatar,
                    'phone' => $property->owner_phone,
                    'response_rate' => $property->owner_response_rate,
                    'response_time' => $property->owner_response_time,
                ],
                'rules' => $property->rules ?? [],
                'facilities' => $property->facilities ?? [],
                'created_at' => $property->created_at->toISOString(),
                'updated_at' => $property->updated_at->toISOString(),
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedProperty,
                'message' => 'Property details retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve property details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all available amenities.
     */
    public function getAmenities(): JsonResponse
    {
        try {
            $amenities = KostAmenity::orderBy('is_popular', 'desc')
                ->orderBy('category')
                ->orderBy('name')
                ->get()
                ->map(function ($amenity) {
                    return [
                        'id' => (string) $amenity->id,
                        'name' => $amenity->name,
                        'icon' => $amenity->icon,
                        'category' => $amenity->category,
                        'is_popular' => $amenity->is_popular,
                    ];
                });

            // Group amenities by category
            $groupedAmenities = $amenities->groupBy('category');

            return response()->json([
                'success' => true,
                'data' => [
                    'all' => $amenities,
                    'grouped' => $groupedAmenities,
                    'popular' => $amenities->where('is_popular', true)->values(),
                ],
                'message' => 'Amenities retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve amenities',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all cities with property counts.
     */
    public function getCities(): JsonResponse
    {
        try {
            $cities = City::active()
                ->ordered()
                ->get()
                ->map(function ($city) {
                    // Count properties in this city
                    $propertyCount = KostProperty::whereHas('location', function ($query) use ($city) {
                        $query->where('city', $city->city);
                    })->count();

                    return [
                        'id' => (string) $city->id,
                        'name' => $city->name,
                        'city' => $city->city,
                        'province' => $city->province,
                        'type' => $city->type,
                        'full_name' => $city->full_name,
                        'is_popular' => $city->is_popular,
                        'property_count' => $propertyCount,
                        'latitude' => $city->latitude,
                        'longitude' => $city->longitude,
                    ];
                });

            // Separate popular and regular cities
            $popularCities = $cities->where('is_popular', true)->values();
            $regularCities = $cities->where('is_popular', false)->values();

            return response()->json([
                'success' => true,
                'data' => [
                    'all' => $cities,
                    'popular' => $popularCities,
                    'regular' => $regularCities,
                    'total_count' => $cities->count(),
                ],
                'message' => 'Cities retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve cities',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get properties by city.
     */
    public function getPropertiesByCity(string $cityName): JsonResponse
    {
        try {
            $properties = KostProperty::with([
                'location',
                'images' => function ($query) {
                    $query->orderBy('order');
                },
                'amenities'
            ])
            ->whereHas('location', function ($query) use ($cityName) {
                $query->where('city', 'like', '%' . $cityName . '%');
            })
            ->orderBy('is_featured', 'desc')
            ->orderBy('rating', 'desc')
            ->get();

            $transformedProperties = $properties->map(function ($property) {
                return $this->transformProperty($property);
            });

            return response()->json([
                'success' => true,
                'data' => $transformedProperties,
                'city' => $cityName,
                'total_count' => $properties->count(),
                'message' => "Properties in {$cityName} retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve properties by city',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics for dashboard.
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $totalProperties = KostProperty::count();
            $featuredProperties = KostProperty::featured()->count();
            $verifiedProperties = KostProperty::verified()->count();
            $totalCities = City::active()->count();
            $popularCities = City::popular()->count();
            $totalAmenities = KostAmenity::count();
            $popularAmenities = KostAmenity::where('is_popular', true)->count();

            // Property type distribution
            $propertyTypes = KostProperty::selectRaw('property_type, COUNT(*) as count')
                ->groupBy('property_type')
                ->get()
                ->pluck('count', 'property_type');

            // Top cities by property count
            $topCities = KostLocation::selectRaw('city, COUNT(*) as property_count')
                ->groupBy('city')
                ->orderBy('property_count', 'desc')
                ->limit(10)
                ->get();

            // Average price by city
            $avgPriceByCity = KostProperty::join('kost_locations', 'kost_properties.location_id', '=', 'kost_locations.id')
                ->selectRaw('kost_locations.city, AVG(kost_properties.price_monthly) as avg_price')
                ->groupBy('kost_locations.city')
                ->orderBy('avg_price', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => [
                        'total_properties' => $totalProperties,
                        'featured_properties' => $featuredProperties,
                        'verified_properties' => $verifiedProperties,
                        'total_cities' => $totalCities,
                        'popular_cities' => $popularCities,
                        'total_amenities' => $totalAmenities,
                        'popular_amenities' => $popularAmenities,
                    ],
                    'property_types' => $propertyTypes,
                    'top_cities' => $topCities,
                    'avg_price_by_city' => $avgPriceByCity,
                ],
                'message' => 'Statistics retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get nearby properties based on location.
     */
    public function getNearbyProperties(Request $request): JsonResponse
    {
        try {
            $latitude = $request->get('latitude');
            $longitude = $request->get('longitude');
            $radius = $request->get('radius', 5); // Default 5km radius
            $limit = $request->get('limit', 10);

            if (!$latitude || !$longitude) {
                return response()->json([
                    'success' => false,
                    'message' => 'Latitude and longitude are required'
                ], 400);
            }

            // Using Haversine formula to find nearby properties
            $properties = KostProperty::with([
                'location',
                'images' => function ($query) {
                    $query->orderBy('order');
                },
                'amenities'
            ])
            ->whereHas('location', function ($query) use ($latitude, $longitude, $radius) {
                $query->selectRaw("
                    *, (
                        6371 * acos(
                            cos(radians(?)) *
                            cos(radians(latitude)) *
                            cos(radians(longitude) - radians(?)) +
                            sin(radians(?)) *
                            sin(radians(latitude))
                        )
                    ) AS distance
                ", [$latitude, $longitude, $latitude])
                ->havingRaw('distance < ?', [$radius]);
            })
            ->orderBy('is_featured', 'desc')
            ->orderBy('rating', 'desc')
            ->limit($limit)
            ->get();

            $transformedProperties = $properties->map(function ($property) use ($latitude, $longitude) {
                $transformed = $this->transformProperty($property);

                // Calculate distance
                $distance = $this->calculateDistance(
                    $latitude,
                    $longitude,
                    $property->location->latitude,
                    $property->location->longitude
                );

                $transformed['distance'] = round($distance, 2);
                return $transformed;
            });

            return response()->json([
                'success' => true,
                'data' => $transformedProperties,
                'search_params' => [
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'radius' => $radius,
                ],
                'message' => 'Nearby properties retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve nearby properties',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Transform property data to consistent format.
     */
    private function transformProperty($property): array
    {
        return [
            'id' => (string) $property->id,
            'title' => $property->title,
            'description' => $property->description,
            'price_monthly' => $property->price_monthly,
            'price_daily' => $property->price_daily,
            'property_type' => $property->property_type,
            'room_type' => $property->room_type,
            'available_rooms' => $property->available_rooms,
            'total_rooms' => $property->total_rooms,
            'images' => $property->images->map(function ($image) {
                return [
                    'id' => (string) $image->id,
                    'url' => $image->full_url,
                    'alt' => $image->alt,
                    'is_primary' => $image->is_primary,
                    'order' => $image->order,
                ];
            }),
            'amenities' => $property->amenities->map(function ($amenity) {
                return [
                    'id' => (string) $amenity->id,
                    'name' => $amenity->name,
                    'icon' => $amenity->icon,
                    'category' => $amenity->category,
                    'is_popular' => $amenity->is_popular,
                ];
            }),
            'location' => [
                'id' => (string) $property->location->id,
                'address' => $property->location->address,
                'district' => $property->location->district,
                'city' => $property->location->city,
                'province' => $property->location->province,
                'postal_code' => $property->location->postal_code,
                'latitude' => $property->location->latitude,
                'longitude' => $property->location->longitude,
                'nearby_landmarks' => $property->location->nearby_landmarks,
            ],
            'rating' => (float) $property->rating,
            'review_count' => $property->review_count,
            'is_featured' => $property->is_featured,
            'is_verified' => $property->is_verified,
            'owner' => [
                'id' => (string) $property->id,
                'name' => $property->owner_name,
                'avatar' => $property->owner_avatar,
                'phone' => $property->owner_phone,
                'response_rate' => $property->owner_response_rate,
                'response_time' => $property->owner_response_time,
            ],
            'rules' => $property->rules ?? [],
            'facilities' => $property->facilities ?? [],
            'created_at' => $property->created_at->toISOString(),
            'updated_at' => $property->updated_at->toISOString(),
        ];
    }

    /**
     * Calculate distance between two coordinates using Haversine formula.
     */
    private function calculateDistance($lat1, $lon1, $lat2, $lon2): float
    {
        $earthRadius = 6371; // Earth's radius in kilometers

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $earthRadius * $c;
    }
}
