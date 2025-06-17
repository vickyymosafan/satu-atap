<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            // DKI Jakarta - Popular cities
            ['name' => 'Jakarta Pusat', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 1],
            ['name' => 'Jakarta Selatan', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 2],
            ['name' => 'Jakarta Barat', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 3],
            ['name' => 'Jakarta Utara', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 4],
            ['name' => 'Jakarta Timur', 'city' => 'Jakarta', 'province' => 'DKI Jakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 5],

            // Jawa Barat - Popular cities
            ['name' => 'Bandung', 'city' => 'Bandung', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 6],
            ['name' => 'Bekasi', 'city' => 'Bekasi', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 7],
            ['name' => 'Depok', 'city' => 'Depok', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 8],
            ['name' => 'Bogor', 'city' => 'Bogor', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 9],

            // Jawa Tengah - Popular cities
            ['name' => 'Semarang', 'city' => 'Semarang', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => true, 'sort_order' => 10],
            ['name' => 'Solo', 'city' => 'Solo', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => true, 'sort_order' => 11],

            // DI Yogyakarta
            ['name' => 'Yogyakarta', 'city' => 'Yogyakarta', 'province' => 'DI Yogyakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 12],

            // Jawa Timur - Popular cities
            ['name' => 'Surabaya', 'city' => 'Surabaya', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 13],
            ['name' => 'Malang', 'city' => 'Malang', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 14],

            // Banten - Popular cities
            ['name' => 'Tangerang', 'city' => 'Tangerang', 'province' => 'Banten', 'type' => 'city', 'is_popular' => true, 'sort_order' => 15],
            ['name' => 'Tangerang Selatan', 'city' => 'Tangerang Selatan', 'province' => 'Banten', 'type' => 'city', 'is_popular' => true, 'sort_order' => 16],

            // Sumatera Utara
            ['name' => 'Medan', 'city' => 'Medan', 'province' => 'Sumatera Utara', 'type' => 'city', 'is_popular' => true, 'sort_order' => 17],

            // Sumatera Barat
            ['name' => 'Padang', 'city' => 'Padang', 'province' => 'Sumatera Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 18],

            // Riau
            ['name' => 'Pekanbaru', 'city' => 'Pekanbaru', 'province' => 'Riau', 'type' => 'city', 'is_popular' => true, 'sort_order' => 19],

            // Kepulauan Riau
            ['name' => 'Batam', 'city' => 'Batam', 'province' => 'Kepulauan Riau', 'type' => 'city', 'is_popular' => true, 'sort_order' => 20],

            // Sumatera Selatan
            ['name' => 'Palembang', 'city' => 'Palembang', 'province' => 'Sumatera Selatan', 'type' => 'city', 'is_popular' => true, 'sort_order' => 21],

            // Kalimantan Timur
            ['name' => 'Balikpapan', 'city' => 'Balikpapan', 'province' => 'Kalimantan Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 22],

            // Sulawesi Utara
            ['name' => 'Manado', 'city' => 'Manado', 'province' => 'Sulawesi Utara', 'type' => 'city', 'is_popular' => true, 'sort_order' => 23],

            // Sulawesi Selatan
            ['name' => 'Makassar', 'city' => 'Makassar', 'province' => 'Sulawesi Selatan', 'type' => 'city', 'is_popular' => true, 'sort_order' => 24],

            // Bali
            ['name' => 'Denpasar', 'city' => 'Denpasar', 'province' => 'Bali', 'type' => 'city', 'is_popular' => true, 'sort_order' => 25],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }

        $this->command->info('Created ' . count($cities) . ' cities successfully.');
    }
}
