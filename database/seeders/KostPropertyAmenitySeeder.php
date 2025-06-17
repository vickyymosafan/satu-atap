<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KostPropertyAmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data first
        DB::table('kost_property_amenity')->truncate();

        $propertyAmenities = [
            // Property 1: Kost Nyaman Dekat Kampus UI
            ['property_id' => 1, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 1, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 1, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 1, 'amenity_id' => 6], // AC
            ['property_id' => 1, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 1, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 1, 'amenity_id' => 12], // Mushola

            // Property 2: Kost Eksklusif Kemang
            ['property_id' => 2, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 2, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 2, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 2, 'amenity_id' => 4], // Gym
            ['property_id' => 2, 'amenity_id' => 5], // Laundry
            ['property_id' => 2, 'amenity_id' => 6], // AC
            ['property_id' => 2, 'amenity_id' => 8], // TV Kabel
            ['property_id' => 2, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 2, 'amenity_id' => 15], // Ruang Tamu

            // Property 3: Kost Premium Sudirman
            ['property_id' => 3, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 3, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 3, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 3, 'amenity_id' => 4], // Gym
            ['property_id' => 3, 'amenity_id' => 5], // Laundry
            ['property_id' => 3, 'amenity_id' => 6], // AC
            ['property_id' => 3, 'amenity_id' => 8], // TV Kabel
            ['property_id' => 3, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 3, 'amenity_id' => 13], // Kantin
            ['property_id' => 3, 'amenity_id' => 15], // Ruang Tamu

            // Property 4: Kost Budget Friendly
            ['property_id' => 4, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 4, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 4, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 4, 'amenity_id' => 12], // Mushola

            // Property 5: Kost Dago Bandung Premium
            ['property_id' => 5, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 5, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 5, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 5, 'amenity_id' => 5], // Laundry
            ['property_id' => 5, 'amenity_id' => 6], // AC
            ['property_id' => 5, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 5, 'amenity_id' => 12], // Mushola
            ['property_id' => 5, 'amenity_id' => 14], // Taman

            // Property 6: Kost Malioboro Jogja Strategis
            ['property_id' => 6, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 6, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 6, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 6, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 6, 'amenity_id' => 12], // Mushola
            ['property_id' => 6, 'amenity_id' => 15], // Ruang Tamu

            // Property 7: Kost Simpang Lima Semarang
            ['property_id' => 7, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 7, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 7, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 7, 'amenity_id' => 5], // Laundry
            ['property_id' => 7, 'amenity_id' => 6], // AC
            ['property_id' => 7, 'amenity_id' => 12], // Mushola

            // Property 8: Kost Mahasiswa Malang Murah
            ['property_id' => 8, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 8, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 8, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 8, 'amenity_id' => 12], // Mushola

            // Property 9: Kost Surabaya Darmo Elite
            ['property_id' => 9, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 9, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 9, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 9, 'amenity_id' => 4], // Gym
            ['property_id' => 9, 'amenity_id' => 5], // Laundry
            ['property_id' => 9, 'amenity_id' => 6], // AC
            ['property_id' => 9, 'amenity_id' => 8], // TV Kabel
            ['property_id' => 9, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 9, 'amenity_id' => 13], // Kantin
            ['property_id' => 9, 'amenity_id' => 15], // Ruang Tamu

            // Property 10: Kost Denpasar Bali Nyaman
            ['property_id' => 10, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 10, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 10, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 10, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 10, 'amenity_id' => 12], // Mushola
            ['property_id' => 10, 'amenity_id' => 14], // Taman
            ['property_id' => 10, 'amenity_id' => 15], // Ruang Tamu

            // Property 11: Kost Bekasi Cyber Park Modern
            ['property_id' => 11, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 11, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 11, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 11, 'amenity_id' => 6], // AC

            // Property 12: Kost Bogor Dekat IPB
            ['property_id' => 12, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 12, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 12, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 12, 'amenity_id' => 14], // Taman

            // Property 13: Kost Tangerang UMN Premium
            ['property_id' => 13, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 13, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 13, 'amenity_id' => 4], // Gym
            ['property_id' => 13, 'amenity_id' => 5], // Laundry
            ['property_id' => 13, 'amenity_id' => 6], // AC

            // Property 14: Kost BSD Serpong Elite
            ['property_id' => 14, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 14, 'amenity_id' => 6], // AC
            ['property_id' => 14, 'amenity_id' => 8], // TV Kabel
            ['property_id' => 14, 'amenity_id' => 11], // Kamar Furnished

            // Property 15: Kost Jakarta Utara Ancol
            ['property_id' => 15, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 15, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 15, 'amenity_id' => 6], // AC
            ['property_id' => 15, 'amenity_id' => 7], // Dapur Bersama

            // Property 16: Kost Jakarta Timur Cakung
            ['property_id' => 16, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 16, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 16, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 16, 'amenity_id' => 12], // Mushola

            // Property 17: Kost Solo Laweyan Heritage
            ['property_id' => 17, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 17, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 17, 'amenity_id' => 6], // AC
            ['property_id' => 17, 'amenity_id' => 15], // Ruang Tamu

            // Property 18: Kost Medan USU Modern
            ['property_id' => 18, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 18, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 18, 'amenity_id' => 5], // Laundry
            ['property_id' => 18, 'amenity_id' => 6], // AC

            // Property 19: Kost Padang Unand Strategis
            ['property_id' => 19, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 19, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 19, 'amenity_id' => 7], // Dapur Bersama
            ['property_id' => 19, 'amenity_id' => 12], // Mushola

            // Property 20: Kost Pekanbaru Unri Premium
            ['property_id' => 20, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 20, 'amenity_id' => 5], // Laundry
            ['property_id' => 20, 'amenity_id' => 6], // AC
            ['property_id' => 20, 'amenity_id' => 11], // Kamar Furnished

            // Property 21: Kost Batam UIB Exclusive
            ['property_id' => 21, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 21, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 21, 'amenity_id' => 4], // Gym
            ['property_id' => 21, 'amenity_id' => 6], // AC
            ['property_id' => 21, 'amenity_id' => 11], // Kamar Furnished

            // Property 22: Kost Palembang Unsri Nyaman
            ['property_id' => 22, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 22, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 22, 'amenity_id' => 6], // AC
            ['property_id' => 22, 'amenity_id' => 7], // Dapur Bersama

            // Property 23: Kost Balikpapan Uniba Modern
            ['property_id' => 23, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 23, 'amenity_id' => 3], // Keamanan 24 Jam
            ['property_id' => 23, 'amenity_id' => 4], // Gym
            ['property_id' => 23, 'amenity_id' => 5], // Laundry
            ['property_id' => 23, 'amenity_id' => 6], // AC

            // Property 24: Kost Manado Unsrat Strategis
            ['property_id' => 24, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 24, 'amenity_id' => 2], // Parkir Motor
            ['property_id' => 24, 'amenity_id' => 6], // AC
            ['property_id' => 24, 'amenity_id' => 14], // Taman

            // Property 25: Kost Makassar Unhas Premium
            ['property_id' => 25, 'amenity_id' => 1], // WiFi Gratis
            ['property_id' => 25, 'amenity_id' => 5], // Laundry
            ['property_id' => 25, 'amenity_id' => 6], // AC
            ['property_id' => 25, 'amenity_id' => 11], // Kamar Furnished
            ['property_id' => 25, 'amenity_id' => 15], // Ruang Tamu
        ];

        foreach ($propertyAmenities as $propertyAmenity) {
            DB::table('kost_property_amenity')->insert($propertyAmenity);
        }
    }
}
