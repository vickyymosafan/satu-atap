<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create test user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password')
            ]
        );

        // Seed kost-related data
        $this->call([
            CitySeeder::class, // Add cities first
            KostLocationSeeder::class,
            KostAmenitySeeder::class,
            KostPropertySeeder::class,
            KostPropertyAmenitySeeder::class,
            KostImageSeeder::class,
            // Why Choose Us section data
            CompanyBenefitSeeder::class,
            TrustIndicatorSeeder::class,
            PlatformStatisticSeeder::class,
            VerificationBadgeSeeder::class,
            // Contact & Support section data
            SupportHotlineSeeder::class,
            SocialMediaLinkSeeder::class,
            FaqItemSeeder::class,
        ]);
    }
}
