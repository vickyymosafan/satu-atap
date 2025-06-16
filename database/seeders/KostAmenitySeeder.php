<?php

namespace Database\Seeders;

use App\Models\KostAmenity;
use Illuminate\Database\Seeder;

class KostAmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            [
                'id' => 1,
                'name' => 'WiFi Gratis',
                'icon' => 'wifi',
                'category' => 'connectivity',
                'is_popular' => true,
            ],
            [
                'id' => 2,
                'name' => 'Parkir Motor',
                'icon' => 'car',
                'category' => 'basic',
                'is_popular' => true,
            ],
            [
                'id' => 3,
                'name' => 'Keamanan 24 Jam',
                'icon' => 'shield',
                'category' => 'security',
                'is_popular' => true,
            ],
            [
                'id' => 4,
                'name' => 'Gym',
                'icon' => 'dumbbell',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 5,
                'name' => 'Laundry',
                'icon' => 'washing-machine',
                'category' => 'basic',
                'is_popular' => true,
            ],
        ];

        foreach ($amenities as $amenity) {
            KostAmenity::create($amenity);
        }
    }
}
