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
            // Additional Indonesian amenities
            [
                'id' => 6,
                'name' => 'AC',
                'icon' => 'snowflake',
                'category' => 'comfort',
                'is_popular' => true,
            ],
            [
                'id' => 7,
                'name' => 'Dapur Bersama',
                'icon' => 'chef-hat',
                'category' => 'basic',
                'is_popular' => true,
            ],
            [
                'id' => 8,
                'name' => 'TV Kabel',
                'icon' => 'tv',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 9,
                'name' => 'Listrik Termasuk',
                'icon' => 'zap',
                'category' => 'basic',
                'is_popular' => false,
            ],
            [
                'id' => 10,
                'name' => 'Air Bersih',
                'icon' => 'waves',
                'category' => 'basic',
                'is_popular' => false,
            ],
            [
                'id' => 11,
                'name' => 'Kamar Furnished',
                'icon' => 'home',
                'category' => 'comfort',
                'is_popular' => true,
            ],
            [
                'id' => 12,
                'name' => 'Mushola',
                'icon' => 'home',
                'category' => 'basic',
                'is_popular' => true,
            ],
            [
                'id' => 13,
                'name' => 'Kantin',
                'icon' => 'utensils',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 14,
                'name' => 'Taman',
                'icon' => 'tree-pine',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 15,
                'name' => 'Ruang Tamu',
                'icon' => 'sofa',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            // Additional Indonesian-specific amenities
            [
                'id' => 16,
                'name' => 'Parkir Mobil',
                'icon' => 'car',
                'category' => 'basic',
                'is_popular' => false,
            ],
            [
                'id' => 17,
                'name' => 'CCTV',
                'icon' => 'video',
                'category' => 'security',
                'is_popular' => true,
            ],
            [
                'id' => 18,
                'name' => 'Kulkas Bersama',
                'icon' => 'refrigerator',
                'category' => 'basic',
                'is_popular' => false,
            ],
            [
                'id' => 19,
                'name' => 'Dispenser',
                'icon' => 'cup',
                'category' => 'basic',
                'is_popular' => true,
            ],
            [
                'id' => 20,
                'name' => 'Jemuran',
                'icon' => 'shirt',
                'category' => 'basic',
                'is_popular' => true,
            ],
            [
                'id' => 21,
                'name' => 'Kamar Mandi Dalam',
                'icon' => 'bath',
                'category' => 'comfort',
                'is_popular' => true,
            ],
            [
                'id' => 22,
                'name' => 'Kamar Mandi Luar',
                'icon' => 'bath',
                'category' => 'basic',
                'is_popular' => false,
            ],
            [
                'id' => 23,
                'name' => 'Balkon',
                'icon' => 'home',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 24,
                'name' => 'Rooftop',
                'icon' => 'building',
                'category' => 'comfort',
                'is_popular' => false,
            ],
            [
                'id' => 25,
                'name' => 'Akses 24 Jam',
                'icon' => 'clock',
                'category' => 'basic',
                'is_popular' => true,
            ],
        ];

        foreach ($amenities as $amenity) {
            KostAmenity::create($amenity);
        }
    }
}
