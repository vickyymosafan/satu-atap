<?php

namespace Tests\Feature;

use App\Models\SocialMediaLink;
use App\Models\FaqItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactSupportTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_support_index_returns_successful_response()
    {
        // Create test data
        SocialMediaLink::factory()->create([
            'platform_name' => 'Facebook',
            'platform_url' => 'https://facebook.com/test',
            'icon' => 'Facebook',
            'is_active' => true,
            'sort_order' => 1
        ]);

        FaqItem::factory()->create([
            'question' => 'Test FAQ Question?',
            'answer' => 'Test FAQ Answer',
            'category' => 'general',
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1
        ]);

        $response = $this->getJson('/api/contact-support');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'social_media' => [
                            '*' => [
                                'id',
                                'platform_name',
                                'platform_url',
                                'icon',
                                'is_active',
                                'sort_order'
                            ]
                        ],
                        'featured_faqs' => [
                            '*' => [
                                'id',
                                'question',
                                'answer',
                                'category',
                                'is_featured',
                                'is_active',
                                'sort_order',
                                'view_count'
                            ]
                        ],
                        'faq_categories'
                    ],
                    'message'
                ])
                ->assertJson([
                    'success' => true
                ]);
    }

    public function test_contact_form_submission_with_valid_data()
    {
        $formData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1234567890',
            'subject' => 'Test Subject',
            'message' => 'This is a test message'
        ];

        $response = $this->postJson('/api/contact-support/contact-form', $formData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'id',
                        'name',
                        'email',
                        'phone',
                        'subject',
                        'message',
                        'status'
                    ],
                    'message'
                ])
                ->assertJson([
                    'success' => true
                ]);

        $this->assertDatabaseHas('contact_forms', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject'
        ]);
    }

    public function test_contact_form_submission_with_invalid_data()
    {
        $formData = [
            'name' => '',
            'email' => 'invalid-email',
            'subject' => '',
            'message' => ''
        ];

        $response = $this->postJson('/api/contact-support/contact-form', $formData);

        $response->assertStatus(422)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'errors'
                ])
                ->assertJson([
                    'success' => false
                ]);
    }

    public function test_faq_search_functionality()
    {
        FaqItem::factory()->create([
            'question' => 'How to book a property?',
            'answer' => 'You can book by clicking the book button',
            'category' => 'booking',
            'is_active' => true
        ]);

        FaqItem::factory()->create([
            'question' => 'Payment methods available?',
            'answer' => 'We accept credit cards and bank transfers',
            'category' => 'payment',
            'is_active' => true
        ]);

        // Test search functionality
        $response = $this->getJson('/api/contact-support/faqs?search=book');

        $response->assertStatus(200);

        // Debug: Let's see what we actually get
        $responseData = $response->json();
        if (empty($responseData['data'])) {
            // Try without search to see if FAQs exist
            $allFaqs = $this->getJson('/api/contact-support/faqs')->json();
            $this->fail('Search returned no results. All FAQs: ' . json_encode($allFaqs['data']));
        }

        $response->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.question', 'How to book a property?');

        // Test category filtering
        $response = $this->getJson('/api/contact-support/faqs?category=payment');

        $response->assertStatus(200)
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.category', 'payment');
    }

    public function test_faq_view_count_increment()
    {
        $faq = FaqItem::factory()->create([
            'question' => 'Test FAQ',
            'answer' => 'Test Answer',
            'view_count' => 0,
            'is_active' => true
        ]);

        $response = $this->postJson("/api/contact-support/faqs/{$faq->id}/view");

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ]);

        $this->assertDatabaseHas('faq_items', [
            'id' => $faq->id,
            'view_count' => 1
        ]);
    }
}
