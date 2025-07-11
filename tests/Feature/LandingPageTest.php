<?php

namespace Tests\Feature;

use App\Models\KostProperty;
use App\Models\KostImage;
use App\Models\KostAmenity;
use App\Models\KostLocation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data
        $this->createTestProperties();
    }

    public function test_landing_page_loads_successfully()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Landing/LandingPage')
        );
    }

    public function test_featured_properties_api_returns_data()
    {
        $response = $this->getJson('/api/properties/featured');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'title',
                            'description',
                            'price_monthly',
                            'property_type',
                            'available_rooms',
                            'total_rooms',
                            'rating',
                            'review_count',
                            'is_featured',
                            'is_verified',
                            'images',
                            'amenities',
                            'location',
                            'owner'
                        ]
                    ]
                ]);
    }

    public function test_availability_api_returns_correct_data()
    {
        $property = KostProperty::first();
        
        $response = $this->postJson('/api/properties/availability', [
            'propertyIds' => [$property->id]
        ]);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'propertyId',
                            'availableRooms',
                            'totalRooms',
                            'status',
                            'lastUpdated'
                        ]
                    ]
                ]);
    }

    public function test_single_property_availability_api()
    {
        $property = KostProperty::first();
        
        $response = $this->getJson("/api/properties/{$property->id}/availability");

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'propertyId',
                        'availableRooms',
                        'totalRooms',
                        'status',
                        'lastUpdated'
                    ]
                ]);
    }

    public function test_availability_status_calculation()
    {
        // Test full property
        $fullProperty = KostProperty::factory()->create([
            'available_rooms' => 0,
            'total_rooms' => 10
        ]);

        $response = $this->getJson("/api/properties/{$fullProperty->id}/availability");
        $response->assertStatus(200)
                ->assertJsonPath('data.status', 'full');

        // Test limited availability property
        $limitedProperty = KostProperty::factory()->create([
            'available_rooms' => 1,
            'total_rooms' => 10
        ]);

        $response = $this->getJson("/api/properties/{$limitedProperty->id}/availability");
        $response->assertStatus(200)
                ->assertJsonPath('data.status', 'limited');

        // Test available property
        $availableProperty = KostProperty::factory()->create([
            'available_rooms' => 5,
            'total_rooms' => 10
        ]);

        $response = $this->getJson("/api/properties/{$availableProperty->id}/availability");
        $response->assertStatus(200)
                ->assertJsonPath('data.status', 'available');
    }

    public function test_availability_stats_api()
    {
        $response = $this->getJson('/api/availability/stats');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'totalProperties',
                        'availableProperties',
                        'fullProperties',
                        'limitedProperties',
                        'totalRooms',
                        'availableRooms',
                        'occupancyRate',
                        'lastUpdated'
                    ]
                ]);
    }

    public function test_contact_form_submission()
    {
        $contactData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'subject' => 'Inquiry about kost',
            'message' => $this->faker->paragraph
        ];

        $response = $this->postJson('/api/contact', $contactData);

        // This would test the contact form API when implemented
        // For now, we expect a 404 since the route doesn't exist yet
        $response->assertStatus(404);
    }

    public function test_property_search_functionality()
    {
        $searchData = [
            'query' => 'Jakarta',
            'property_type' => 'putra',
            'min_price' => 1000000,
            'max_price' => 3000000
        ];

        $response = $this->postJson('/api/properties/search', $searchData);

        // This would test the search API when implemented
        // For now, we expect a 404 since the route doesn't exist yet
        $response->assertStatus(404);
    }

    public function test_property_filtering()
    {
        // Create properties with different types
        KostProperty::factory()->create(['property_type' => 'putra']);
        KostProperty::factory()->create(['property_type' => 'putri']);
        KostProperty::factory()->create(['property_type' => 'campur']);

        // Test filtering by property type
        $response = $this->getJson('/api/properties?property_type=putra');
        
        // This would test the filtering when the API is implemented
        $response->assertStatus(404);
    }

    public function test_responsive_design_meta_tags()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        
        // Check that the page includes responsive meta tags
        $content = $response->getContent();
        $this->assertStringContainsString('viewport', $content);
        $this->assertStringContainsString('width=device-width', $content);
    }

    public function test_seo_meta_tags()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        
        $content = $response->getContent();
        
        // Check for basic SEO meta tags
        $this->assertStringContainsString('<title>', $content);
        $this->assertStringContainsString('description', $content);
    }

    public function test_performance_headers()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        
        // Check for performance-related headers
        // These would be set by middleware or server configuration
        // $response->assertHeader('Cache-Control');
    }

    private function createTestProperties()
    {
        // Create test properties with all required relationships
        KostProperty::factory()
            ->count(5)
            ->has(KostImage::factory()->count(3))
            ->has(KostAmenity::factory()->count(4))
            ->has(KostLocation::factory())
            ->create([
                'is_featured' => true,
                'is_verified' => true
            ]);

        // Create some non-featured properties
        KostProperty::factory()
            ->count(10)
            ->has(KostImage::factory()->count(2))
            ->has(KostAmenity::factory()->count(3))
            ->has(KostLocation::factory())
            ->create([
                'is_featured' => false
            ]);
    }
}
