<?php

namespace App\Http\Controllers;

use App\Models\KostProperty;
use App\Models\KostLocation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

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
                            'id' => $amenity->icon, // Use icon as ID for compatibility
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

            // Amenities filter
            if ($request->has('amenities') && is_array($request->amenities) && !empty($request->amenities)) {
                $query->whereHas('amenities', function ($q) use ($request) {
                    $q->whereIn('icon', $request->amenities);
                }, '>=', count($request->amenities));
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
                            'id' => $amenity->icon, // Use icon as ID for compatibility
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

            if (empty($query)) {
                // Return popular cities when no query
                $popularCities = [
                    ['id' => 'jakarta', 'name' => 'Jakarta', 'type' => 'city', 'province' => 'DKI Jakarta'],
                    ['id' => 'bandung', 'name' => 'Bandung', 'type' => 'city', 'province' => 'Jawa Barat'],
                    ['id' => 'yogyakarta', 'name' => 'Yogyakarta', 'type' => 'city', 'province' => 'DI Yogyakarta'],
                    ['id' => 'surabaya', 'name' => 'Surabaya', 'type' => 'city', 'province' => 'Jawa Timur'],
                    ['id' => 'semarang', 'name' => 'Semarang', 'type' => 'city', 'province' => 'Jawa Tengah'],
                ];

                return response()->json([
                    'success' => true,
                    'data' => $popularCities,
                    'message' => 'Popular cities retrieved successfully'
                ]);
            }

            // Search locations based on query
            $locations = KostLocation::where('city', 'like', '%' . $query . '%')
                ->orWhere('district', 'like', '%' . $query . '%')
                ->orWhere('province', 'like', '%' . $query . '%')
                ->limit(10)
                ->get()
                ->map(function ($location) {
                    return [
                        'id' => (string) $location->id,
                        'name' => $location->city,
                        'district' => $location->district,
                        'city' => $location->city,
                        'province' => $location->province,
                        'type' => 'city',
                        'full_name' => $location->district . ', ' . $location->city . ', ' . $location->province,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $locations,
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
}
