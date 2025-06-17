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
            ['name' => 'Cimahi', 'city' => 'Cimahi', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 10],
            ['name' => 'Tasikmalaya', 'city' => 'Tasikmalaya', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 11],
            ['name' => 'Cirebon', 'city' => 'Cirebon', 'province' => 'Jawa Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 12],

            // Jawa Tengah
            ['name' => 'Semarang', 'city' => 'Semarang', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => true, 'sort_order' => 13],
            ['name' => 'Solo', 'city' => 'Solo', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => true, 'sort_order' => 14],
            ['name' => 'Magelang', 'city' => 'Magelang', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 15],
            ['name' => 'Salatiga', 'city' => 'Salatiga', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 16],
            ['name' => 'Pekalongan', 'city' => 'Pekalongan', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 17],
            ['name' => 'Tegal', 'city' => 'Tegal', 'province' => 'Jawa Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 18],

            // DI Yogyakarta
            ['name' => 'Yogyakarta', 'city' => 'Yogyakarta', 'province' => 'DI Yogyakarta', 'type' => 'city', 'is_popular' => true, 'sort_order' => 19],

            // Jawa Timur
            ['name' => 'Surabaya', 'city' => 'Surabaya', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 20],
            ['name' => 'Malang', 'city' => 'Malang', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 21],
            ['name' => 'Kediri', 'city' => 'Kediri', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 22],
            ['name' => 'Blitar', 'city' => 'Blitar', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 23],
            ['name' => 'Mojokerto', 'city' => 'Mojokerto', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 24],
            ['name' => 'Madiun', 'city' => 'Madiun', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 25],
            ['name' => 'Pasuruan', 'city' => 'Pasuruan', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 26],
            ['name' => 'Probolinggo', 'city' => 'Probolinggo', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 27],
            ['name' => 'Batu', 'city' => 'Batu', 'province' => 'Jawa Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 28],

            // Banten
            ['name' => 'Tangerang', 'city' => 'Tangerang', 'province' => 'Banten', 'type' => 'city', 'is_popular' => true, 'sort_order' => 29],
            ['name' => 'Tangerang Selatan', 'city' => 'Tangerang Selatan', 'province' => 'Banten', 'type' => 'city', 'is_popular' => true, 'sort_order' => 30],
            ['name' => 'Serang', 'city' => 'Serang', 'province' => 'Banten', 'type' => 'city', 'is_popular' => false, 'sort_order' => 31],
            ['name' => 'Cilegon', 'city' => 'Cilegon', 'province' => 'Banten', 'type' => 'city', 'is_popular' => false, 'sort_order' => 32],

            // Sumatera Utara
            ['name' => 'Medan', 'city' => 'Medan', 'province' => 'Sumatera Utara', 'type' => 'city', 'is_popular' => true, 'sort_order' => 33],
            ['name' => 'Binjai', 'city' => 'Binjai', 'province' => 'Sumatera Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 34],
            ['name' => 'Pematangsiantar', 'city' => 'Pematangsiantar', 'province' => 'Sumatera Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 35],
            ['name' => 'Tebing Tinggi', 'city' => 'Tebing Tinggi', 'province' => 'Sumatera Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 36],

            // Sumatera Barat
            ['name' => 'Padang', 'city' => 'Padang', 'province' => 'Sumatera Barat', 'type' => 'city', 'is_popular' => true, 'sort_order' => 37],
            ['name' => 'Bukittinggi', 'city' => 'Bukittinggi', 'province' => 'Sumatera Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 38],
            ['name' => 'Padang Panjang', 'city' => 'Padang Panjang', 'province' => 'Sumatera Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 39],
            ['name' => 'Payakumbuh', 'city' => 'Payakumbuh', 'province' => 'Sumatera Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 40],

            // Riau
            ['name' => 'Pekanbaru', 'city' => 'Pekanbaru', 'province' => 'Riau', 'type' => 'city', 'is_popular' => true, 'sort_order' => 41],
            ['name' => 'Dumai', 'city' => 'Dumai', 'province' => 'Riau', 'type' => 'city', 'is_popular' => false, 'sort_order' => 42],

            // Kepulauan Riau
            ['name' => 'Batam', 'city' => 'Batam', 'province' => 'Kepulauan Riau', 'type' => 'city', 'is_popular' => true, 'sort_order' => 43],
            ['name' => 'Tanjung Pinang', 'city' => 'Tanjung Pinang', 'province' => 'Kepulauan Riau', 'type' => 'city', 'is_popular' => false, 'sort_order' => 44],

            // Jambi
            ['name' => 'Jambi', 'city' => 'Jambi', 'province' => 'Jambi', 'type' => 'city', 'is_popular' => false, 'sort_order' => 45],

            // Sumatera Selatan
            ['name' => 'Palembang', 'city' => 'Palembang', 'province' => 'Sumatera Selatan', 'type' => 'city', 'is_popular' => true, 'sort_order' => 46],
            ['name' => 'Prabumulih', 'city' => 'Prabumulih', 'province' => 'Sumatera Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 47],
            ['name' => 'Lubuklinggau', 'city' => 'Lubuklinggau', 'province' => 'Sumatera Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 48],

            // Bengkulu
            ['name' => 'Bengkulu', 'city' => 'Bengkulu', 'province' => 'Bengkulu', 'type' => 'city', 'is_popular' => false, 'sort_order' => 49],

            // Lampung
            ['name' => 'Bandar Lampung', 'city' => 'Bandar Lampung', 'province' => 'Lampung', 'type' => 'city', 'is_popular' => false, 'sort_order' => 50],
            ['name' => 'Metro', 'city' => 'Metro', 'province' => 'Lampung', 'type' => 'city', 'is_popular' => false, 'sort_order' => 51],

            // Kalimantan Barat
            ['name' => 'Pontianak', 'city' => 'Pontianak', 'province' => 'Kalimantan Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 52],
            ['name' => 'Singkawang', 'city' => 'Singkawang', 'province' => 'Kalimantan Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 53],

            // Kalimantan Tengah
            ['name' => 'Palangka Raya', 'city' => 'Palangka Raya', 'province' => 'Kalimantan Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 54],

            // Kalimantan Selatan
            ['name' => 'Banjarmasin', 'city' => 'Banjarmasin', 'province' => 'Kalimantan Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 55],
            ['name' => 'Banjarbaru', 'city' => 'Banjarbaru', 'province' => 'Kalimantan Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 56],

            // Kalimantan Timur
            ['name' => 'Samarinda', 'city' => 'Samarinda', 'province' => 'Kalimantan Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 57],
            ['name' => 'Balikpapan', 'city' => 'Balikpapan', 'province' => 'Kalimantan Timur', 'type' => 'city', 'is_popular' => true, 'sort_order' => 58],
            ['name' => 'Bontang', 'city' => 'Bontang', 'province' => 'Kalimantan Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 59],

            // Kalimantan Utara
            ['name' => 'Tarakan', 'city' => 'Tarakan', 'province' => 'Kalimantan Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 60],

            // Sulawesi Utara
            ['name' => 'Manado', 'city' => 'Manado', 'province' => 'Sulawesi Utara', 'type' => 'city', 'is_popular' => true, 'sort_order' => 61],
            ['name' => 'Bitung', 'city' => 'Bitung', 'province' => 'Sulawesi Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 62],
            ['name' => 'Tomohon', 'city' => 'Tomohon', 'province' => 'Sulawesi Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 63],

            // Sulawesi Tengah
            ['name' => 'Palu', 'city' => 'Palu', 'province' => 'Sulawesi Tengah', 'type' => 'city', 'is_popular' => false, 'sort_order' => 64],

            // Sulawesi Selatan
            ['name' => 'Makassar', 'city' => 'Makassar', 'province' => 'Sulawesi Selatan', 'type' => 'city', 'is_popular' => true, 'sort_order' => 65],
            ['name' => 'Parepare', 'city' => 'Parepare', 'province' => 'Sulawesi Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 66],
            ['name' => 'Palopo', 'city' => 'Palopo', 'province' => 'Sulawesi Selatan', 'type' => 'city', 'is_popular' => false, 'sort_order' => 67],

            // Sulawesi Tenggara
            ['name' => 'Kendari', 'city' => 'Kendari', 'province' => 'Sulawesi Tenggara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 68],
            ['name' => 'Bau-Bau', 'city' => 'Bau-Bau', 'province' => 'Sulawesi Tenggara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 69],

            // Gorontalo
            ['name' => 'Gorontalo', 'city' => 'Gorontalo', 'province' => 'Gorontalo', 'type' => 'city', 'is_popular' => false, 'sort_order' => 70],

            // Sulawesi Barat
            ['name' => 'Mamuju', 'city' => 'Mamuju', 'province' => 'Sulawesi Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 71],

            // Bali
            ['name' => 'Denpasar', 'city' => 'Denpasar', 'province' => 'Bali', 'type' => 'city', 'is_popular' => true, 'sort_order' => 72],

            // Nusa Tenggara Barat
            ['name' => 'Mataram', 'city' => 'Mataram', 'province' => 'Nusa Tenggara Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 73],
            ['name' => 'Bima', 'city' => 'Bima', 'province' => 'Nusa Tenggara Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 74],

            // Nusa Tenggara Timur
            ['name' => 'Kupang', 'city' => 'Kupang', 'province' => 'Nusa Tenggara Timur', 'type' => 'city', 'is_popular' => false, 'sort_order' => 75],

            // Maluku
            ['name' => 'Ambon', 'city' => 'Ambon', 'province' => 'Maluku', 'type' => 'city', 'is_popular' => false, 'sort_order' => 76],
            ['name' => 'Tual', 'city' => 'Tual', 'province' => 'Maluku', 'type' => 'city', 'is_popular' => false, 'sort_order' => 77],

            // Maluku Utara
            ['name' => 'Ternate', 'city' => 'Ternate', 'province' => 'Maluku Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 78],
            ['name' => 'Tidore Kepulauan', 'city' => 'Tidore Kepulauan', 'province' => 'Maluku Utara', 'type' => 'city', 'is_popular' => false, 'sort_order' => 79],

            // Papua Barat
            ['name' => 'Manokwari', 'city' => 'Manokwari', 'province' => 'Papua Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 80],
            ['name' => 'Sorong', 'city' => 'Sorong', 'province' => 'Papua Barat', 'type' => 'city', 'is_popular' => false, 'sort_order' => 81],

            // Papua
            ['name' => 'Jayapura', 'city' => 'Jayapura', 'province' => 'Papua', 'type' => 'city', 'is_popular' => false, 'sort_order' => 82],

            // Aceh
            ['name' => 'Banda Aceh', 'city' => 'Banda Aceh', 'province' => 'Aceh', 'type' => 'city', 'is_popular' => false, 'sort_order' => 83],
            ['name' => 'Langsa', 'city' => 'Langsa', 'province' => 'Aceh', 'type' => 'city', 'is_popular' => false, 'sort_order' => 84],
            ['name' => 'Lhokseumawe', 'city' => 'Lhokseumawe', 'province' => 'Aceh', 'type' => 'city', 'is_popular' => false, 'sort_order' => 85],
            ['name' => 'Sabang', 'city' => 'Sabang', 'province' => 'Aceh', 'type' => 'city', 'is_popular' => false, 'sort_order' => 86],
            ['name' => 'Subulussalam', 'city' => 'Subulussalam', 'province' => 'Aceh', 'type' => 'city', 'is_popular' => false, 'sort_order' => 87],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }

        $this->command->info('Created ' . count($cities) . ' cities successfully.');
    }
}
