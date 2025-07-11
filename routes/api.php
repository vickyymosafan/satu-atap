<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Real-time availability routes
Route::prefix('properties')->group(function () {
    // Get availability for multiple properties
    Route::post('/availability', [App\Http\Controllers\Api\AvailabilityController::class, 'getMultipleAvailability']);

    // Get availability for single property
    Route::get('/{propertyId}/availability', [App\Http\Controllers\Api\AvailabilityController::class, 'getSingleAvailability']);

    // Update availability (requires authentication)
    Route::middleware('auth:sanctum')->put('/{propertyId}/availability', [App\Http\Controllers\Api\AvailabilityController::class, 'updateAvailability']);

    // Clear availability cache (admin only)
    Route::middleware('auth:sanctum')->delete('/{propertyId}/availability/cache', [App\Http\Controllers\Api\AvailabilityController::class, 'clearCache']);
});

// Availability statistics
Route::get('/availability/stats', [App\Http\Controllers\Api\AvailabilityController::class, 'getAvailabilityStats']);


