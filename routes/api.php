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

/*
|--------------------------------------------------------------------------
| Kost Property Routes
|--------------------------------------------------------------------------
|
| Routes for managing kost properties, including featured properties,
| search functionality, and property details.
|
*/

// Public routes (no authentication required)
Route::prefix('kosts')->group(function () {
    // Get featured properties for landing page
    Route::get('/featured', [App\Http\Controllers\KostController::class, 'getFeatured'])
        ->name('api.kosts.featured');

    // Search properties with filters
    Route::get('/search', [App\Http\Controllers\KostController::class, 'search'])
        ->name('api.kosts.search');

    // Get location suggestions for autocomplete
    Route::get('/locations/suggestions', [App\Http\Controllers\KostController::class, 'getLocationSuggestions'])
        ->name('api.kosts.locations.suggestions');

    // Get all amenities
    Route::get('/amenities', [App\Http\Controllers\KostController::class, 'getAmenities'])
        ->name('api.kosts.amenities');

    // Get all cities with property counts
    Route::get('/cities', [App\Http\Controllers\KostController::class, 'getCities'])
        ->name('api.kosts.cities');

    // Get properties by city
    Route::get('/city/{cityName}', [App\Http\Controllers\KostController::class, 'getPropertiesByCity'])
        ->name('api.kosts.city');

    // Get statistics for dashboard
    Route::get('/statistics', [App\Http\Controllers\KostController::class, 'getStatistics'])
        ->name('api.kosts.statistics');

    // Get nearby properties
    Route::get('/nearby', [App\Http\Controllers\KostController::class, 'getNearbyProperties'])
        ->name('api.kosts.nearby');

    // Get property details by ID
    Route::get('/{id}', [App\Http\Controllers\KostController::class, 'show'])
        ->name('api.kosts.show');

    // Get property images
    Route::get('/{id}/images', function ($id) {
        // TODO: Implement KostController@getImages
        return response()->json([
            'success' => true,
            'data' => [],
            'message' => 'Property images retrieved successfully'
        ]);
    })->name('api.kosts.images');

    // Get property reviews
    Route::get('/{id}/reviews', function ($id) {
        // TODO: Implement ReviewController@getByProperty
        return response()->json([
            'success' => true,
            'data' => [],
            'pagination' => [
                'current_page' => 1,
                'per_page' => 10,
                'total' => 0,
                'last_page' => 1
            ],
            'message' => 'Property reviews retrieved successfully'
        ]);
    })->name('api.kosts.reviews');
});

/*
|--------------------------------------------------------------------------
| Cities Routes
|--------------------------------------------------------------------------
|
| Routes for city data including search, autocomplete, and filtering.
|
*/

Route::prefix('cities')->group(function () {
    // Get all cities with optional filtering
    Route::get('/', [App\Http\Controllers\Api\CityController::class, 'index'])
        ->name('api.cities.index');

    // Get autocomplete suggestions for cities
    Route::get('/autocomplete', [App\Http\Controllers\Api\CityController::class, 'autocomplete'])
        ->name('api.cities.autocomplete');

    // Get all provinces
    Route::get('/provinces', [App\Http\Controllers\Api\CityController::class, 'provinces'])
        ->name('api.cities.provinces');

    // Get popular cities
    Route::get('/popular', [App\Http\Controllers\Api\CityController::class, 'popular'])
        ->name('api.cities.popular');

    // Get unique cities (grouped by city name)
    Route::get('/unique', [App\Http\Controllers\Api\CityController::class, 'unique'])
        ->name('api.cities.unique');

    // Get cities with property statistics
    Route::get('/with-stats', [App\Http\Controllers\Api\CityController::class, 'withStats'])
        ->name('api.cities.with-stats');

    // Get city statistics summary
    Route::get('/statistics', [App\Http\Controllers\Api\CityController::class, 'statistics'])
        ->name('api.cities.statistics');

    // Get specific city by ID
    Route::get('/{city}', [App\Http\Controllers\Api\CityController::class, 'show'])
        ->name('api.cities.show');
});

/*
|--------------------------------------------------------------------------
| Location Routes
|--------------------------------------------------------------------------
|
| Routes for location-based functionality including autocomplete
| and nearby landmarks.
|
*/

Route::prefix('locations')->group(function () {
    // Location autocomplete for search (legacy - use cities/autocomplete instead)
    Route::get('/autocomplete', [App\Http\Controllers\Api\CityController::class, 'autocomplete'])
        ->name('api.locations.autocomplete');

    // Get nearby landmarks for a location
    Route::get('/{id}/landmarks', function ($id) {
        // TODO: Implement LocationController@getLandmarks
        return response()->json([
            'success' => true,
            'data' => [],
            'message' => 'Nearby landmarks retrieved successfully'
        ]);
    })->name('api.locations.landmarks');
});

/*
|--------------------------------------------------------------------------
| User Favorites Routes (Authenticated)
|--------------------------------------------------------------------------
|
| Routes for managing user favorites, requires authentication.
|
*/

Route::middleware('auth:sanctum')->prefix('favorites')->group(function () {
    // Get user's favorite properties
    Route::get('/', function (Request $request) {
        // TODO: Implement FavoriteController@index
        return response()->json([
            'success' => true,
            'data' => [],
            'message' => 'User favorites retrieved successfully'
        ]);
    })->name('api.favorites.index');

    // Add property to favorites
    Route::post('/{propertyId}', function ($propertyId) {
        // TODO: Implement FavoriteController@store
        return response()->json([
            'success' => true,
            'message' => 'Property added to favorites successfully'
        ]);
    })->name('api.favorites.store');

    // Remove property from favorites
    Route::delete('/{propertyId}', function ($propertyId) {
        // TODO: Implement FavoriteController@destroy
        return response()->json([
            'success' => true,
            'message' => 'Property removed from favorites successfully'
        ]);
    })->name('api.favorites.destroy');
});

/*
|--------------------------------------------------------------------------
| Contact Routes
|--------------------------------------------------------------------------
|
| Routes for contacting property owners and managing inquiries.
|
*/

Route::prefix('contact')->group(function () {
    // Send inquiry to property owner
    Route::post('/inquiry', function (Request $request) {
        // TODO: Implement ContactController@sendInquiry
        return response()->json([
            'success' => true,
            'message' => 'Inquiry sent successfully'
        ]);
    })->name('api.contact.inquiry');

    // Get owner contact information
    Route::get('/owner/{propertyId}', function ($propertyId) {
        // TODO: Implement ContactController@getOwnerInfo
        return response()->json([
            'success' => true,
            'data' => [
                'phone' => null,
                'whatsapp' => null,
                'email' => null,
                'response_rate' => 0,
                'response_time' => null
            ],
            'message' => 'Owner contact information retrieved successfully'
        ]);
    })->name('api.contact.owner');
});

// Why Choose Us section routes
Route::prefix('why-choose-us')->group(function () {
    // Get all Why Choose Us data
    Route::get('/', [App\Http\Controllers\WhyChooseUsController::class, 'index'])
        ->name('api.why-choose-us.index');

    // Get company benefits
    Route::get('/benefits', [App\Http\Controllers\WhyChooseUsController::class, 'getBenefits'])
        ->name('api.why-choose-us.benefits');

    // Get trust indicators
    Route::get('/trust-indicators', [App\Http\Controllers\WhyChooseUsController::class, 'getTrustIndicators'])
        ->name('api.why-choose-us.trust-indicators');

    // Get platform statistics
    Route::get('/statistics', [App\Http\Controllers\WhyChooseUsController::class, 'getStatistics'])
        ->name('api.why-choose-us.statistics');

    // Get verification badges
    Route::get('/verification-badges', [App\Http\Controllers\WhyChooseUsController::class, 'getVerificationBadges'])
        ->name('api.why-choose-us.verification-badges');
});

// Contact section routes (removed support hotlines)
Route::prefix('contact-support')->group(function () {
    // Get all Contact data
    Route::get('/', [App\Http\Controllers\ContactSupportController::class, 'index'])
        ->name('api.contact-support.index');

    // Submit contact form
    Route::post('/contact-form', [App\Http\Controllers\ContactSupportController::class, 'submitContactForm'])
        ->name('api.contact-support.contact-form');

    // Get social media links
    Route::get('/social-media', [App\Http\Controllers\ContactSupportController::class, 'getSocialMediaLinks'])
        ->name('api.contact-support.social-media');

    // Get FAQ items
    Route::get('/faqs', [App\Http\Controllers\ContactSupportController::class, 'getFaqs'])
        ->name('api.contact-support.faqs');

    // Increment FAQ view count
    Route::post('/faqs/{id}/view', [App\Http\Controllers\ContactSupportController::class, 'incrementFaqView'])
        ->name('api.contact-support.faqs.view');
});
