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
            // Additional Indonesian locations
            [
                'id' => 5,
                'address' => 'Jl. Dago No. 78',
                'district' => 'Coblong',
                'city' => 'Bandung',
                'province' => 'Jawa Barat',
                'postal_code' => '40135',
                'latitude' => -6.8951,
                'longitude' => 107.6084,
                'nearby_landmarks' => ['ITB', 'Dago Plaza', 'Cihampelas Walk'],
            ],
            [
                'id' => 6,
                'address' => 'Jl. Malioboro No. 156',
                'district' => 'Gedongtengen',
                'city' => 'Yogyakarta',
                'province' => 'DI Yogyakarta',
                'postal_code' => '55271',
                'latitude' => -7.7956,
                'longitude' => 110.3695,
                'nearby_landmarks' => ['UGM', 'Malioboro Street', 'Tugu Station'],
            ],
            [
                'id' => 7,
                'address' => 'Jl. Pemuda No. 89',
                'district' => 'Semarang Tengah',
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'postal_code' => '50132',
                'latitude' => -6.9667,
                'longitude' => 110.4167,
                'nearby_landmarks' => ['UNDIP', 'Simpang Lima', 'Lawang Sewu'],
            ],
            [
                'id' => 8,
                'address' => 'Jl. Veteran No. 234',
                'district' => 'Lowokwaru',
                'city' => 'Malang',
                'province' => 'Jawa Timur',
                'postal_code' => '65145',
                'latitude' => -7.9666,
                'longitude' => 112.6326,
                'nearby_landmarks' => ['Universitas Brawijaya', 'Alun-alun Malang', 'Malang Town Square'],
            ],
            [
                'id' => 9,
                'address' => 'Jl. Raya Darmo No. 67',
                'district' => 'Wonokromo',
                'city' => 'Surabaya',
                'province' => 'Jawa Timur',
                'postal_code' => '60241',
                'latitude' => -7.2575,
                'longitude' => 112.7521,
                'nearby_landmarks' => ['ITS', 'Tunjungan Plaza', 'Surabaya Zoo'],
            ],
            [
                'id' => 10,
                'address' => 'Jl. Gajah Mada No. 123',
                'district' => 'Denpasar Barat',
                'city' => 'Denpasar',
                'province' => 'Bali',
                'postal_code' => '80119',
                'latitude' => -8.6500,
                'longitude' => 115.2167,
                'nearby_landmarks' => ['Universitas Udayana', 'Pasar Badung', 'Bali Museum'],
            ],
        ];

        foreach ($locations as $location) {
            KostLocation::create($location);
        }
    }
}
