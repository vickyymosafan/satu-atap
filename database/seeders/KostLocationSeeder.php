<?php

namespace Database\Seeders;

use App\Models\KostLocation;
use Illuminate\Database\Seeder;

class KostLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'id' => 1,
                'address' => 'Jl. Margonda Raya No. 123',
                'district' => 'Beji',
                'city' => 'Depok',
                'province' => 'Jawa Barat',
                'postal_code' => '16424',
                'latitude' => -6.3728,
                'longitude' => 106.8317,
                'nearby_landmarks' => ['Universitas Indonesia', 'Stasiun UI', 'Mall Depok'],
            ],
            [
                'id' => 2,
                'address' => 'Jl. Kemang Raya No. 45',
                'district' => 'Kemang',
                'city' => 'Jakarta Selatan',
                'province' => 'DKI Jakarta',
                'postal_code' => '12560',
                'latitude' => -6.2615,
                'longitude' => 106.8106,
                'nearby_landmarks' => ['Kemang Village', 'Stasiun MRT Cipete', 'Mall Kemang'],
            ],
            [
                'id' => 3,
                'address' => 'Jl. Sudirman No. 89',
                'district' => 'Tanah Abang',
                'city' => 'Jakarta Pusat',
                'province' => 'DKI Jakarta',
                'postal_code' => '10270',
                'latitude' => -6.2088,
                'longitude' => 106.8229,
                'nearby_landmarks' => ['Stasiun Sudirman', 'Plaza Indonesia', 'Grand Indonesia'],
            ],
            [
                'id' => 4,
                'address' => 'Jl. Kebon Jeruk No. 45',
                'district' => 'Kebon Jeruk',
                'city' => 'Jakarta Barat',
                'province' => 'DKI Jakarta',
                'postal_code' => '11530',
                'latitude' => -6.1944,
                'longitude' => 106.7831,
                'nearby_landmarks' => ['Universitas Trisakti', 'Mall Taman Anggrek', 'Stasiun Palmerah'],
            ],
        ];

        foreach ($locations as $location) {
            KostLocation::create($location);
        }
    }
}
