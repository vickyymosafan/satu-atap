<?php

namespace App\Http\Controllers;

use App\Models\KostProperty;
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
            $query = KostProperty::with(['location', 'images', 'amenities']);

            // Apply filters
            if ($request->has('city') && $request->city) {
                $query->whereHas('location', function ($q) use ($request) {
                    $q->where('city', 'like', '%' . $request->city . '%');
                });
            }

            if ($request->has('property_type') && $request->property_type) {
                $query->where('property_type', $request->property_type);
            }

            if ($request->has('min_price') && $request->min_price) {
                $query->where('price_monthly', '>=', $request->min_price);
            }

            if ($request->has('max_price') && $request->max_price) {
                $query->where('price_monthly', '<=', $request->max_price);
            }

            $properties = $query->orderBy('rating', 'desc')->paginate(12);

            return response()->json([
                'success' => true,
                'data' => $properties,
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
}
