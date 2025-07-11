<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KostProperty;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AvailabilityController extends Controller
{
    /**
     * Get availability status for multiple properties
     */
    public function getMultipleAvailability(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'propertyIds' => 'required|array|max:50',
                'propertyIds.*' => 'required|string|exists:kost_properties,id'
            ]);

            $propertyIds = $request->input('propertyIds');
            $availabilityData = [];

            foreach ($propertyIds as $propertyId) {
                $availability = $this->getPropertyAvailability($propertyId);
                if ($availability) {
                    $availabilityData[] = $availability;
                }
            }

            return response()->json([
                'success' => true,
                'data' => $availabilityData,
                'message' => 'Availability data retrieved successfully'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('Error fetching multiple availability: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch availability data'
            ], 500);
        }
    }

    /**
     * Get availability status for a single property
     */
    public function getSingleAvailability(string $propertyId): JsonResponse
    {
        try {
            $availability = $this->getPropertyAvailability($propertyId);

            if (!$availability) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $availability,
                'message' => 'Availability data retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching single availability: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch availability data'
            ], 500);
        }
    }

    /**
     * Update availability status (for property owners/admins)
     */
    public function updateAvailability(Request $request, string $propertyId): JsonResponse
    {
        try {
            $request->validate([
                'available_rooms' => 'required|integer|min:0',
                'total_rooms' => 'required|integer|min:1',
                'status' => 'sometimes|in:available,limited,full,offline'
            ]);

            $property = KostProperty::findOrFail($propertyId);
            
            // Check if user has permission to update this property
            // This would typically check ownership or admin rights
            // For now, we'll assume the user has permission

            $availableRooms = $request->input('available_rooms');
            $totalRooms = $request->input('total_rooms');

            // Validate that available rooms doesn't exceed total rooms
            if ($availableRooms > $totalRooms) {
                return response()->json([
                    'success' => false,
                    'message' => 'Available rooms cannot exceed total rooms'
                ], 422);
            }

            // Update property
            $property->update([
                'available_rooms' => $availableRooms,
                'total_rooms' => $totalRooms
            ]);

            // Determine status if not provided
            $status = $request->input('status');
            if (!$status) {
                $status = $this->determineAvailabilityStatus($availableRooms, $totalRooms);
            }

            // Cache the updated availability
            $availabilityData = [
                'propertyId' => $propertyId,
                'availableRooms' => $availableRooms,
                'totalRooms' => $totalRooms,
                'status' => $status,
                'lastUpdated' => now()->toISOString()
            ];

            Cache::put("availability:{$propertyId}", $availabilityData, now()->addMinutes(30));

            // Here you would typically broadcast the update via WebSocket
            // broadcast(new AvailabilityUpdated($availabilityData));

            return response()->json([
                'success' => true,
                'data' => $availabilityData,
                'message' => 'Availability updated successfully'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('Error updating availability: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update availability'
            ], 500);
        }
    }

    /**
     * Get property availability with caching
     */
    private function getPropertyAvailability(string $propertyId): ?array
    {
        // Try to get from cache first
        $cached = Cache::get("availability:{$propertyId}");
        if ($cached) {
            return $cached;
        }

        // Fetch from database
        $property = KostProperty::find($propertyId);
        if (!$property) {
            return null;
        }

        $availableRooms = $property->available_rooms ?? 0;
        $totalRooms = $property->total_rooms ?? 1;
        $status = $this->determineAvailabilityStatus($availableRooms, $totalRooms);

        $availabilityData = [
            'propertyId' => $propertyId,
            'availableRooms' => $availableRooms,
            'totalRooms' => $totalRooms,
            'status' => $status,
            'lastUpdated' => $property->updated_at->toISOString()
        ];

        // Cache for 5 minutes
        Cache::put("availability:{$propertyId}", $availabilityData, now()->addMinutes(5));

        return $availabilityData;
    }

    /**
     * Determine availability status based on room counts
     */
    private function determineAvailabilityStatus(int $availableRooms, int $totalRooms): string
    {
        if ($availableRooms === 0) {
            return 'full';
        }

        $occupancyRate = ($totalRooms - $availableRooms) / $totalRooms;

        if ($occupancyRate >= 0.9) {
            return 'limited'; // 90% or more occupied
        }

        return 'available';
    }

    /**
     * Get availability statistics for dashboard
     */
    public function getAvailabilityStats(): JsonResponse
    {
        try {
            $stats = Cache::remember('availability_stats', now()->addMinutes(10), function () {
                $totalProperties = KostProperty::count();
                $availableProperties = KostProperty::where('available_rooms', '>', 0)->count();
                $fullProperties = KostProperty::where('available_rooms', 0)->count();
                $totalRooms = KostProperty::sum('total_rooms');
                $availableRooms = KostProperty::sum('available_rooms');

                return [
                    'totalProperties' => $totalProperties,
                    'availableProperties' => $availableProperties,
                    'fullProperties' => $fullProperties,
                    'limitedProperties' => $totalProperties - $availableProperties - $fullProperties,
                    'totalRooms' => $totalRooms,
                    'availableRooms' => $availableRooms,
                    'occupancyRate' => $totalRooms > 0 ? round((($totalRooms - $availableRooms) / $totalRooms) * 100, 2) : 0,
                    'lastUpdated' => now()->toISOString()
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Availability statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching availability stats: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch availability statistics'
            ], 500);
        }
    }

    /**
     * Clear availability cache for a property
     */
    public function clearCache(string $propertyId): JsonResponse
    {
        try {
            Cache::forget("availability:{$propertyId}");

            return response()->json([
                'success' => true,
                'message' => 'Cache cleared successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error clearing availability cache: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cache'
            ], 500);
        }
    }
}
