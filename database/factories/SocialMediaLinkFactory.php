<?php

namespace Database\Factories;

use App\Models\SocialMediaLink;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialMediaLink>
 */
class SocialMediaLinkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SocialMediaLink::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $platforms = [
            'Facebook' => ['icon' => 'Facebook', 'type' => 'social'],
            'Instagram' => ['icon' => 'Instagram', 'type' => 'social'],
            'Twitter' => ['icon' => 'Twitter', 'type' => 'social'],
            'LinkedIn' => ['icon' => 'Linkedin', 'type' => 'professional'],
            'YouTube' => ['icon' => 'Youtube', 'type' => 'social'],
            'TikTok' => ['icon' => 'Music', 'type' => 'social'],
            'WhatsApp' => ['icon' => 'MessageCircle', 'type' => 'messaging'],
            'Telegram' => ['icon' => 'Send', 'type' => 'messaging'],
        ];

        $platform = $this->faker->randomElement(array_keys($platforms));
        $platformData = $platforms[$platform];
        $username = $this->faker->userName();

        return [
            'platform_name' => $platform,
            'platform_url' => $this->generatePlatformUrl($platform, $username),
            'icon' => $platformData['icon'],
            'display_name' => $this->faker->optional()->words(2, true) ?: $platform,
            'username' => $username,
            'platform_type' => $platformData['type'],
            'is_active' => $this->faker->boolean(85), // 85% chance of being active
            'sort_order' => $this->faker->numberBetween(1, 10),
        ];
    }

    /**
     * Generate platform-specific URL
     */
    private function generatePlatformUrl(string $platform, string $username): string
    {
        $urls = [
            'Facebook' => "https://facebook.com/{$username}",
            'Instagram' => "https://instagram.com/{$username}",
            'Twitter' => "https://twitter.com/{$username}",
            'LinkedIn' => "https://linkedin.com/in/{$username}",
            'YouTube' => "https://youtube.com/@{$username}",
            'TikTok' => "https://tiktok.com/@{$username}",
            'WhatsApp' => "https://wa.me/{$this->faker->phoneNumber()}",
            'Telegram' => "https://t.me/{$username}",
        ];

        return $urls[$platform] ?? "https://example.com/{$username}";
    }

    /**
     * Indicate that the social media link is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the social media link is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a Facebook social media link.
     */
    public function facebook(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform_name' => 'Facebook',
            'platform_url' => 'https://facebook.com/' . $this->faker->userName(),
            'icon' => 'Facebook',
            'platform_type' => 'social',
        ]);
    }

    /**
     * Create an Instagram social media link.
     */
    public function instagram(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform_name' => 'Instagram',
            'platform_url' => 'https://instagram.com/' . $this->faker->userName(),
            'icon' => 'Instagram',
            'platform_type' => 'social',
        ]);
    }

    /**
     * Create a WhatsApp social media link.
     */
    public function whatsapp(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform_name' => 'WhatsApp',
            'platform_url' => 'https://wa.me/' . $this->faker->phoneNumber(),
            'icon' => 'MessageCircle',
            'platform_type' => 'messaging',
        ]);
    }
}
