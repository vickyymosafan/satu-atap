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

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed kost-related data
        $this->call([
            KostLocationSeeder::class,
            KostAmenitySeeder::class,
            KostPropertySeeder::class,
            KostPropertyAmenitySeeder::class,
            KostImageSeeder::class,
        ]);
    }
}
