<?php

namespace Database\Factories;

use App\Models\FaqItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FaqItem>
 */
class FaqItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FaqItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['general', 'booking', 'payment', 'property', 'account', 'technical'];
        
        $questions = [
            'general' => [
                'What is Satu Atap?',
                'How does the platform work?',
                'Is the service free to use?',
                'How can I contact support?',
            ],
            'booking' => [
                'How do I book a property?',
                'Can I cancel my booking?',
                'How far in advance can I book?',
                'What happens after I book?',
            ],
            'payment' => [
                'What payment methods are accepted?',
                'When do I need to pay?',
                'Are there any additional fees?',
                'How do refunds work?',
            ],
            'property' => [
                'How are properties verified?',
                'Can I visit the property before booking?',
                'What amenities are included?',
                'How do I report property issues?',
            ],
            'account' => [
                'How do I create an account?',
                'How do I reset my password?',
                'Can I update my profile?',
                'How do I delete my account?',
            ],
            'technical' => [
                'The website is not loading properly',
                'I cannot upload photos',
                'The search function is not working',
                'I am having login issues',
            ],
        ];

        $category = $this->faker->randomElement($categories);
        $question = $this->faker->randomElement($questions[$category]);

        return [
            'question' => $question,
            'answer' => $this->faker->paragraphs(rand(2, 4), true),
            'category' => $category,
            'is_featured' => $this->faker->boolean(20), // 20% chance of being featured
            'is_active' => $this->faker->boolean(90), // 90% chance of being active
            'sort_order' => $this->faker->numberBetween(1, 100),
            'view_count' => $this->faker->numberBetween(0, 1000),
        ];
    }

    /**
     * Indicate that the FAQ item is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the FAQ item is not featured.
     */
    public function notFeatured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => false,
        ]);
    }

    /**
     * Indicate that the FAQ item is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the FAQ item is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a general category FAQ.
     */
    public function general(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'general',
            'question' => 'What is Satu Atap?',
            'answer' => 'Satu Atap is a platform that connects property seekers with property owners.',
        ]);
    }

    /**
     * Create a booking category FAQ.
     */
    public function booking(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'booking',
            'question' => 'How do I book a property?',
            'answer' => 'You can book a property by clicking the "Book Now" button and following the instructions.',
        ]);
    }

    /**
     * Create a payment category FAQ.
     */
    public function payment(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'payment',
            'question' => 'What payment methods are accepted?',
            'answer' => 'We accept various payment methods including bank transfers and digital wallets.',
        ]);
    }

    /**
     * Create a property category FAQ.
     */
    public function property(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'property',
            'question' => 'How are properties verified?',
            'answer' => 'All properties go through a verification process to ensure quality and authenticity.',
        ]);
    }

    /**
     * Create an account category FAQ.
     */
    public function account(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'account',
            'question' => 'How do I create an account?',
            'answer' => 'You can create an account by clicking the "Register" button and filling out the form.',
        ]);
    }

    /**
     * Create a technical category FAQ.
     */
    public function technical(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'technical',
            'question' => 'I am having login issues',
            'answer' => 'If you are having login issues, please try resetting your password or contact support.',
        ]);
    }

    /**
     * Create a popular FAQ with high view count.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'view_count' => $this->faker->numberBetween(500, 2000),
            'is_featured' => true,
        ]);
    }
}
