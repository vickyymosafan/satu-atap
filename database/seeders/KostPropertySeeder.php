<?php

namespace Database\Seeders;

use App\Models\KostProperty;
use App\Models\KostAmenity;
use Illuminate\Database\Seeder;

class KostPropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = [
            [
                'id' => 1,
                'title' => 'Kost Nyaman Dekat Kampus UI',
                'description' => 'Kost modern dengan fasilitas lengkap, lokasi strategis dekat Universitas Indonesia',
                'price_monthly' => 1500000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 3,
                'total_rooms' => 20,
                'location_id' => 1,
                'rating' => 4.8,
                'review_count' => 124,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Bu Sari',
                'owner_phone' => '+62812345678',
                'owner_response_rate' => 95,
                'owner_response_time' => '< 1 jam',
                'rules' => ['Tidak boleh merokok', 'Tidak boleh membawa tamu menginap', 'Jam malam 22:00'],
                'facilities' => ['Kamar mandi dalam', 'AC', 'Kasur + lemari', 'Meja belajar'],
            ],
            [
                'id' => 2,
                'title' => 'Kost Eksklusif Jakarta Selatan',
                'description' => 'Kost premium dengan fasilitas hotel, cocok untuk profesional muda',
                'price_monthly' => 2800000,
                'property_type' => 'putra',
                'room_type' => 'single',
                'available_rooms' => 1,
                'total_rooms' => 15,
                'location_id' => 2,
                'rating' => 4.9,
                'review_count' => 89,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Budi',
                'owner_phone' => '+62812345679',
                'owner_response_rate' => 98,
                'owner_response_time' => '< 30 menit',
                'rules' => ['Khusus pria', 'Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['Kamar mandi dalam', 'AC', 'Smart TV', 'Mini fridge', 'Balkon'],
            ],
            [
                'id' => 3,
                'title' => 'Kost Strategis Dekat Stasiun',
                'description' => 'Kost dengan akses mudah ke transportasi umum, cocok untuk pekerja',
                'price_monthly' => 1200000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 5,
                'total_rooms' => 25,
                'location_id' => 3,
                'rating' => 4.6,
                'review_count' => 67,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Rina',
                'owner_phone' => '+62812345680',
                'owner_response_rate' => 92,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Khusus wanita', 'Tidak boleh merokok', 'Jam malam 21:30'],
                'facilities' => ['Kamar mandi dalam', 'AC', 'Lemari pakaian', 'Meja kerja'],
            ],
            [
                'id' => 4,
                'title' => 'Kost Budget Friendly',
                'description' => 'Kost terjangkau dengan fasilitas lengkap untuk mahasiswa',
                'price_monthly' => 800000,
                'property_type' => 'campur',
                'room_type' => 'shared',
                'available_rooms' => 8,
                'total_rooms' => 30,
                'location_id' => 4,
                'rating' => 4.3,
                'review_count' => 45,
                'is_featured' => true,
                'is_verified' => false,
                'owner_name' => 'Pak Joko',
                'owner_phone' => '+62812345681',
                'owner_response_rate' => 88,
                'owner_response_time' => '< 3 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['Kamar mandi bersama', 'Kipas angin', 'Lemari bersama'],
            ],
            // Additional Indonesian properties
            [
                'id' => 5,
                'title' => 'Kost Dago Bandung Premium',
                'description' => 'Kost mewah di kawasan Dago dengan pemandangan kota Bandung yang menawan',
                'price_monthly' => 2200000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 2,
                'total_rooms' => 15,
                'location_id' => 5,
                'rating' => 4.9,
                'review_count' => 87,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Dewi',
                'owner_phone' => '+62813456789',
                'owner_response_rate' => 98,
                'owner_response_time' => '< 30 menit',
                'rules' => ['Khusus putri', 'Tidak boleh merokok', 'Jam malam 23:00', 'Tidak boleh membawa tamu lawan jenis'],
                'facilities' => ['AC', 'Kamar mandi dalam', 'Lemari built-in', 'Meja belajar'],
            ],
            [
                'id' => 6,
                'title' => 'Kost Malioboro Jogja Strategis',
                'description' => 'Kost di jantung kota Yogyakarta, dekat dengan berbagai tempat wisata dan kampus',
                'price_monthly' => 1800000,
                'property_type' => 'putra',
                'room_type' => 'single',
                'available_rooms' => 5,
                'total_rooms' => 25,
                'location_id' => 6,
                'rating' => 4.7,
                'review_count' => 156,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Bambang',
                'owner_phone' => '+62814567890',
                'owner_response_rate' => 92,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Khusus putra', 'Tidak boleh merokok', 'Jam malam 22:00'],
                'facilities' => ['WiFi gratis', 'Parkir motor', 'Dapur bersama', 'Ruang tamu'],
            ],
            [
                'id' => 7,
                'title' => 'Kost Simpang Lima Semarang',
                'description' => 'Kost modern di pusat kota Semarang dengan akses mudah ke berbagai fasilitas',
                'price_monthly' => 1400000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 7,
                'total_rooms' => 20,
                'location_id' => 7,
                'rating' => 4.5,
                'review_count' => 73,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Siti',
                'owner_phone' => '+62815678901',
                'owner_response_rate' => 89,
                'owner_response_time' => '< 4 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:30', 'Tidak boleh membawa hewan'],
                'facilities' => ['AC', 'WiFi gratis', 'Laundry', 'Keamanan 24 jam'],
            ],
            [
                'id' => 8,
                'title' => 'Kost Mahasiswa Malang Murah',
                'description' => 'Kost terjangkau untuk mahasiswa di Malang dengan fasilitas lengkap',
                'price_monthly' => 950000,
                'property_type' => 'campur',
                'room_type' => 'shared',
                'available_rooms' => 12,
                'total_rooms' => 35,
                'location_id' => 8,
                'rating' => 4.2,
                'review_count' => 89,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Pak Agus',
                'owner_phone' => '+62816789012',
                'owner_response_rate' => 85,
                'owner_response_time' => '< 6 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['WiFi gratis', 'Dapur bersama', 'Parkir motor', 'Kamar mandi bersama'],
            ],
            [
                'id' => 9,
                'title' => 'Kost Surabaya Darmo Elite',
                'description' => 'Kost eksklusif di kawasan elite Darmo Surabaya dengan fasilitas premium',
                'price_monthly' => 2800000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 1,
                'total_rooms' => 12,
                'location_id' => 9,
                'rating' => 4.8,
                'review_count' => 42,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Ratna',
                'owner_phone' => '+62817890123',
                'owner_response_rate' => 96,
                'owner_response_time' => '< 1 jam',
                'rules' => ['Khusus putri', 'Tidak boleh merokok', 'Jam malam 23:30', 'Tidak boleh membawa tamu lawan jenis'],
                'facilities' => ['AC', 'Kamar mandi dalam', 'Balkon pribadi', 'Lemari built-in', 'Meja kerja'],
            ],
            [
                'id' => 10,
                'title' => 'Kost Denpasar Bali Nyaman',
                'description' => 'Kost dengan nuansa Bali yang asri dan nyaman untuk tinggal jangka panjang',
                'price_monthly' => 1600000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 4,
                'total_rooms' => 18,
                'location_id' => 10,
                'rating' => 4.6,
                'review_count' => 67,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Made',
                'owner_phone' => '+62818901234',
                'owner_response_rate' => 91,
                'owner_response_time' => '< 3 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00', 'Hormati budaya lokal'],
                'facilities' => ['WiFi gratis', 'Taman', 'Parkir motor', 'Dapur bersama', 'Ruang santai'],
            ],
            // Additional properties for new cities
            [
                'id' => 11,
                'title' => 'Kost Bekasi Cyber Park Modern',
                'description' => 'Kost modern dekat pusat bisnis Bekasi dengan fasilitas lengkap',
                'price_monthly' => 1300000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 6,
                'total_rooms' => 22,
                'location_id' => 11,
                'rating' => 4.4,
                'review_count' => 58,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Ibu Lina',
                'owner_phone' => '+62819012345',
                'owner_response_rate' => 87,
                'owner_response_time' => '< 4 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['WiFi gratis', 'AC', 'Parkir motor', 'Keamanan 24 jam'],
            ],
            [
                'id' => 12,
                'title' => 'Kost Bogor Dekat IPB',
                'description' => 'Kost strategis untuk mahasiswa IPB dengan suasana sejuk khas Bogor',
                'price_monthly' => 1100000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 8,
                'total_rooms' => 25,
                'location_id' => 12,
                'rating' => 4.3,
                'review_count' => 92,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Hendra',
                'owner_phone' => '+62820123456',
                'owner_response_rate' => 90,
                'owner_response_time' => '< 3 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00', 'Tidak boleh membawa hewan'],
                'facilities' => ['WiFi gratis', 'Dapur bersama', 'Parkir motor', 'Taman'],
            ],
            [
                'id' => 13,
                'title' => 'Kost Tangerang UMN Premium',
                'description' => 'Kost eksklusif dekat UMN dengan fasilitas premium untuk mahasiswa',
                'price_monthly' => 1800000,
                'property_type' => 'putra',
                'room_type' => 'single',
                'available_rooms' => 3,
                'total_rooms' => 15,
                'location_id' => 13,
                'rating' => 4.7,
                'review_count' => 76,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Maya',
                'owner_phone' => '+62821234567',
                'owner_response_rate' => 94,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Khusus putra', 'Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['AC', 'WiFi gratis', 'Gym', 'Laundry', 'Keamanan 24 jam'],
            ],
            [
                'id' => 14,
                'title' => 'Kost BSD Serpong Elite',
                'description' => 'Kost mewah di kawasan BSD dengan akses mudah ke berbagai fasilitas',
                'price_monthly' => 2500000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 2,
                'total_rooms' => 12,
                'location_id' => 14,
                'rating' => 4.8,
                'review_count' => 45,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Sinta',
                'owner_phone' => '+62822345678',
                'owner_response_rate' => 97,
                'owner_response_time' => '< 1 jam',
                'rules' => ['Khusus putri', 'Tidak boleh merokok', 'Jam malam 23:30'],
                'facilities' => ['AC', 'Kamar mandi dalam', 'Balkon', 'Smart TV', 'Mini fridge'],
            ],
            [
                'id' => 15,
                'title' => 'Kost Jakarta Utara Ancol',
                'description' => 'Kost dekat kawasan wisata Ancol dengan akses mudah ke pelabuhan',
                'price_monthly' => 1400000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 5,
                'total_rooms' => 20,
                'location_id' => 15,
                'rating' => 4.2,
                'review_count' => 63,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Pak Rudi',
                'owner_phone' => '+62823456789',
                'owner_response_rate' => 85,
                'owner_response_time' => '< 5 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['WiFi gratis', 'AC', 'Parkir motor', 'Dapur bersama'],
            ],
            [
                'id' => 16,
                'title' => 'Kost Jakarta Timur Cakung',
                'description' => 'Kost strategis di Jakarta Timur dengan akses mudah ke berbagai universitas',
                'price_monthly' => 1200000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 7,
                'total_rooms' => 24,
                'location_id' => 16,
                'rating' => 4.1,
                'review_count' => 71,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Ibu Tuti',
                'owner_phone' => '+62824567890',
                'owner_response_rate' => 82,
                'owner_response_time' => '< 6 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00'],
                'facilities' => ['WiFi gratis', 'Parkir motor', 'Dapur bersama', 'Mushola'],
            ],
            [
                'id' => 17,
                'title' => 'Kost Solo Laweyan Heritage',
                'description' => 'Kost dengan nuansa budaya Solo yang kental, dekat UNS dan keraton',
                'price_monthly' => 1000000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 9,
                'total_rooms' => 28,
                'location_id' => 17,
                'rating' => 4.4,
                'review_count' => 84,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Suryo',
                'owner_phone' => '+62825678901',
                'owner_response_rate' => 88,
                'owner_response_time' => '< 4 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00', 'Hormati budaya lokal'],
                'facilities' => ['WiFi gratis', 'AC', 'Parkir motor', 'Ruang tamu'],
            ],
            [
                'id' => 18,
                'title' => 'Kost Medan USU Modern',
                'description' => 'Kost modern dekat Universitas Sumatera Utara dengan fasilitas lengkap',
                'price_monthly' => 1300000,
                'property_type' => 'putra',
                'room_type' => 'single',
                'available_rooms' => 4,
                'total_rooms' => 18,
                'location_id' => 18,
                'rating' => 4.5,
                'review_count' => 69,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Dedi',
                'owner_phone' => '+62826789012',
                'owner_response_rate' => 91,
                'owner_response_time' => '< 3 jam',
                'rules' => ['Khusus putra', 'Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['AC', 'WiFi gratis', 'Laundry', 'Keamanan 24 jam'],
            ],
            [
                'id' => 19,
                'title' => 'Kost Padang Unand Strategis',
                'description' => 'Kost dekat Universitas Andalas dengan pemandangan kota Padang',
                'price_monthly' => 900000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 10,
                'total_rooms' => 30,
                'location_id' => 19,
                'rating' => 4.2,
                'review_count' => 95,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Ibu Fitri',
                'owner_phone' => '+62827890123',
                'owner_response_rate' => 86,
                'owner_response_time' => '< 5 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00'],
                'facilities' => ['WiFi gratis', 'Parkir motor', 'Dapur bersama', 'Mushola'],
            ],
            [
                'id' => 20,
                'title' => 'Kost Pekanbaru Unri Premium',
                'description' => 'Kost premium dekat Universitas Riau dengan fasilitas modern',
                'price_monthly' => 1400000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 3,
                'total_rooms' => 16,
                'location_id' => 20,
                'rating' => 4.6,
                'review_count' => 52,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Rina',
                'owner_phone' => '+62828901234',
                'owner_response_rate' => 93,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Khusus putri', 'Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['AC', 'WiFi gratis', 'Kamar mandi dalam', 'Laundry'],
            ],
            [
                'id' => 21,
                'title' => 'Kost Batam UIB Exclusive',
                'description' => 'Kost eksklusif dekat Universitas Internasional Batam dengan view laut',
                'price_monthly' => 1800000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 2,
                'total_rooms' => 14,
                'location_id' => 21,
                'rating' => 4.7,
                'review_count' => 38,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Andi',
                'owner_phone' => '+62829012345',
                'owner_response_rate' => 95,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['AC', 'WiFi gratis', 'Balkon', 'Gym', 'Keamanan 24 jam'],
            ],
            [
                'id' => 22,
                'title' => 'Kost Palembang Unsri Nyaman',
                'description' => 'Kost nyaman dekat Universitas Sriwijaya dengan fasilitas lengkap',
                'price_monthly' => 1100000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 6,
                'total_rooms' => 22,
                'location_id' => 22,
                'rating' => 4.3,
                'review_count' => 77,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Ibu Sari',
                'owner_phone' => '+62830123456',
                'owner_response_rate' => 87,
                'owner_response_time' => '< 4 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['WiFi gratis', 'AC', 'Parkir motor', 'Dapur bersama'],
            ],
            [
                'id' => 23,
                'title' => 'Kost Balikpapan Uniba Modern',
                'description' => 'Kost modern di kota minyak Balikpapan dengan fasilitas premium',
                'price_monthly' => 1600000,
                'property_type' => 'putra',
                'room_type' => 'single',
                'available_rooms' => 4,
                'total_rooms' => 16,
                'location_id' => 23,
                'rating' => 4.5,
                'review_count' => 61,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Pak Budi',
                'owner_phone' => '+62831234567',
                'owner_response_rate' => 92,
                'owner_response_time' => '< 3 jam',
                'rules' => ['Khusus putra', 'Tidak boleh merokok', 'Jam malam 22:30'],
                'facilities' => ['AC', 'WiFi gratis', 'Gym', 'Laundry', 'Keamanan 24 jam'],
            ],
            [
                'id' => 24,
                'title' => 'Kost Manado Unsrat Strategis',
                'description' => 'Kost strategis dekat Universitas Sam Ratulangi dengan pemandangan laut',
                'price_monthly' => 1200000,
                'property_type' => 'campur',
                'room_type' => 'single',
                'available_rooms' => 8,
                'total_rooms' => 24,
                'location_id' => 24,
                'rating' => 4.4,
                'review_count' => 83,
                'is_featured' => false,
                'is_verified' => true,
                'owner_name' => 'Ibu Grace',
                'owner_phone' => '+62832345678',
                'owner_response_rate' => 89,
                'owner_response_time' => '< 4 jam',
                'rules' => ['Tidak boleh merokok', 'Jam malam 22:00'],
                'facilities' => ['WiFi gratis', 'AC', 'Parkir motor', 'Taman'],
            ],
            [
                'id' => 25,
                'title' => 'Kost Makassar Unhas Premium',
                'description' => 'Kost premium dekat Universitas Hasanuddin dengan fasilitas lengkap',
                'price_monthly' => 1500000,
                'property_type' => 'putri',
                'room_type' => 'single',
                'available_rooms' => 5,
                'total_rooms' => 20,
                'location_id' => 25,
                'rating' => 4.6,
                'review_count' => 94,
                'is_featured' => true,
                'is_verified' => true,
                'owner_name' => 'Ibu Nurul',
                'owner_phone' => '+62833456789',
                'owner_response_rate' => 94,
                'owner_response_time' => '< 2 jam',
                'rules' => ['Khusus putri', 'Tidak boleh merokok', 'Jam malam 23:00'],
                'facilities' => ['AC', 'WiFi gratis', 'Kamar mandi dalam', 'Laundry', 'Ruang tamu'],
            ],
        ];

        foreach ($properties as $propertyData) {
            $property = KostProperty::create($propertyData);

            // Attach amenities based on property
            switch ($property->id) {
                case 1:
                    $property->amenities()->attach([1, 2, 3, 6, 7, 11, 12]); // WiFi, Parking, Security, AC, Kitchen, Furnished, Mushola
                    break;
                case 2:
                    $property->amenities()->attach([1, 2, 3, 4, 5, 6, 8, 11, 15]); // WiFi, Parking, Security, Gym, Laundry, AC, TV, Furnished, Living Room
                    break;
                case 3:
                    $property->amenities()->attach([1, 2, 3, 4, 5, 6, 8, 11, 13, 15]); // WiFi, Parking, Security, Gym, Laundry, AC, TV, Furnished, Canteen, Living Room
                    break;
                case 4:
                    $property->amenities()->attach([1, 2, 7, 12]); // WiFi, Parking, Kitchen, Mushola
                    break;
                case 5:
                    $property->amenities()->attach([1, 2, 3, 5, 6, 11, 12, 14]); // WiFi, Parking, Security, Laundry, AC, Furnished, Mushola, Garden
                    break;
                case 6:
                    $property->amenities()->attach([1, 2, 3, 7, 12, 15]); // WiFi, Parking, Security, Kitchen, Mushola, Living Room
                    break;
                case 7:
                    $property->amenities()->attach([1, 2, 3, 5, 6, 12]); // WiFi, Parking, Security, Laundry, AC, Mushola
                    break;
                case 8:
                    $property->amenities()->attach([1, 2, 7, 12]); // WiFi, Parking, Kitchen, Mushola
                    break;
                case 9:
                    $property->amenities()->attach([1, 2, 3, 4, 5, 6, 8, 11, 13, 15]); // WiFi, Parking, Security, Gym, Laundry, AC, TV, Furnished, Canteen, Living Room
                    break;
                case 10:
                    $property->amenities()->attach([1, 2, 3, 7, 12, 14, 15]); // WiFi, Parking, Security, Kitchen, Mushola, Garden, Living Room
                    break;
                case 11:
                    $property->amenities()->attach([1, 2, 3, 6]); // WiFi, Parking, Security, AC
                    break;
                case 12:
                    $property->amenities()->attach([1, 2, 7, 14]); // WiFi, Parking, Kitchen, Garden
                    break;
                case 13:
                    $property->amenities()->attach([1, 3, 4, 5, 6]); // WiFi, Security, Gym, Laundry, AC
                    break;
                case 14:
                    $property->amenities()->attach([1, 6, 8, 11]); // WiFi, AC, TV, Furnished
                    break;
                case 15:
                    $property->amenities()->attach([1, 2, 6, 7]); // WiFi, Parking, AC, Kitchen
                    break;
                case 16:
                    $property->amenities()->attach([1, 2, 7, 12]); // WiFi, Parking, Kitchen, Mushola
                    break;
                case 17:
                    $property->amenities()->attach([1, 2, 6, 15]); // WiFi, Parking, AC, Living Room
                    break;
                case 18:
                    $property->amenities()->attach([1, 3, 5, 6]); // WiFi, Security, Laundry, AC
                    break;
                case 19:
                    $property->amenities()->attach([1, 2, 7, 12]); // WiFi, Parking, Kitchen, Mushola
                    break;
                case 20:
                    $property->amenities()->attach([1, 5, 6, 11]); // WiFi, Laundry, AC, Furnished
                    break;
                case 21:
                    $property->amenities()->attach([1, 3, 4, 6, 11]); // WiFi, Security, Gym, AC, Furnished
                    break;
                case 22:
                    $property->amenities()->attach([1, 2, 6, 7]); // WiFi, Parking, AC, Kitchen
                    break;
                case 23:
                    $property->amenities()->attach([1, 3, 4, 5, 6]); // WiFi, Security, Gym, Laundry, AC
                    break;
                case 24:
                    $property->amenities()->attach([1, 2, 6, 14]); // WiFi, Parking, AC, Garden
                    break;
                case 25:
                    $property->amenities()->attach([1, 5, 6, 11, 15]); // WiFi, Laundry, AC, Furnished, Living Room
                    break;
            }
        }
    }
}
