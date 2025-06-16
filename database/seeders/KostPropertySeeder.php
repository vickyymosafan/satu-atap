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
        ];

        foreach ($properties as $propertyData) {
            $property = KostProperty::create($propertyData);

            // Attach amenities based on property
            switch ($property->id) {
                case 1:
                    $property->amenities()->attach([1, 2, 3]); // WiFi, Parking, Security
                    break;
                case 2:
                    $property->amenities()->attach([1, 4, 5]); // WiFi, Gym, Laundry
                    break;
                case 3:
                    $property->amenities()->attach([1, 3, 5]); // WiFi, Security, Laundry
                    break;
                case 4:
                    $property->amenities()->attach([1, 2]); // WiFi, Parking
                    break;
            }
        }
    }
}
