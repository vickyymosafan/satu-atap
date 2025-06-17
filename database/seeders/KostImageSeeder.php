<?php

namespace Database\Seeders;

use App\Models\KostImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class KostImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the kost-images directory if it doesn't exist
        Storage::disk('public')->makeDirectory('kost-images');

        $imageData = [
            // Property 1 images - Kost Nyaman Dekat Kampus UI
            [
                'property_id' => 1,
                'url' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
                'alt' => 'Kamar kost modern',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 1,
                'url' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                'alt' => 'Ruang bersama',
                'is_primary' => false,
                'order' => 2,
            ],
            [
                'property_id' => 1,
                'url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
                'alt' => 'Dapur bersama',
                'is_primary' => false,
                'order' => 3,
            ],
            // Property 2 images - Kost Eksklusif Jakarta Selatan
            [
                'property_id' => 2,
                'url' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'alt' => 'Kamar premium',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 2,
                'url' => 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                'alt' => 'Lobby modern',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 3 images - Kost Strategis Dekat Stasiun
            [
                'property_id' => 3,
                'url' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
                'alt' => 'Kamar nyaman',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 3,
                'url' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                'alt' => 'Area bersama',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 4 images - Kost Budget Friendly
            [
                'property_id' => 4,
                'url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                'alt' => 'Kamar bersama',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 4,
                'url' => 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas umum',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 5 images - Kost Dago Bandung Premium
            [
                'property_id' => 5,
                'url' => 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
                'alt' => 'Kamar premium Bandung',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 5,
                'url' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
                'alt' => 'Pemandangan kota Bandung',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 6 images - Kost Malioboro Jogja Strategis
            [
                'property_id' => 6,
                'url' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
                'alt' => 'Kamar kost Jogja',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 6,
                'url' => 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
                'alt' => 'Ruang tamu Jogja',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 7 images - Kost Simpang Lima Semarang
            [
                'property_id' => 7,
                'url' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
                'alt' => 'Kamar modern Semarang',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 7,
                'url' => 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas keamanan',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 8 images - Kost Mahasiswa Malang Murah
            [
                'property_id' => 8,
                'url' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
                'alt' => 'Kamar mahasiswa Malang',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 8,
                'url' => 'https://images.unsplash.com/photo-1467987506553-8f3916508521?w=800&h=600&fit=crop',
                'alt' => 'Dapur bersama Malang',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 9 images - Kost Surabaya Darmo Elite
            [
                'property_id' => 9,
                'url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
                'alt' => 'Kamar elite Surabaya',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 9,
                'url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
                'alt' => 'Balkon pribadi',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 10 images - Kost Denpasar Bali Nyaman
            [
                'property_id' => 10,
                'url' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
                'alt' => 'Kamar nuansa Bali',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 10,
                'url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'alt' => 'Taman Bali',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 11 images - Kost Bekasi Cyber Park Modern
            [
                'property_id' => 11,
                'url' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                'alt' => 'Kamar modern Bekasi',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 11,
                'url' => 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas keamanan Bekasi',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 12 images - Kost Bogor Dekat IPB
            [
                'property_id' => 12,
                'url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                'alt' => 'Kamar nyaman Bogor',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 12,
                'url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'alt' => 'Taman hijau Bogor',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 13 images - Kost Tangerang UMN Premium
            [
                'property_id' => 13,
                'url' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'alt' => 'Kamar premium Tangerang',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 13,
                'url' => 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas gym Tangerang',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 14 images - Kost BSD Serpong Elite
            [
                'property_id' => 14,
                'url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
                'alt' => 'Kamar elite BSD',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 14,
                'url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
                'alt' => 'Balkon pribadi BSD',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 15 images - Kost Jakarta Utara Ancol
            [
                'property_id' => 15,
                'url' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
                'alt' => 'Kamar Jakarta Utara',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 15,
                'url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
                'alt' => 'Dapur bersama Ancol',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 16 images - Kost Jakarta Timur Cakung
            [
                'property_id' => 16,
                'url' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
                'alt' => 'Kamar Jakarta Timur',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 16,
                'url' => 'https://images.unsplash.com/photo-1467987506553-8f3916508521?w=800&h=600&fit=crop',
                'alt' => 'Mushola Cakung',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 17 images - Kost Solo Laweyan Heritage
            [
                'property_id' => 17,
                'url' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
                'alt' => 'Kamar heritage Solo',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 17,
                'url' => 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
                'alt' => 'Ruang tamu Solo',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 18 images - Kost Medan USU Modern
            [
                'property_id' => 18,
                'url' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
                'alt' => 'Kamar modern Medan',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 18,
                'url' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas laundry Medan',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 19 images - Kost Padang Unand Strategis
            [
                'property_id' => 19,
                'url' => 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
                'alt' => 'Kamar strategis Padang',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 19,
                'url' => 'https://images.unsplash.com/photo-1467987506553-8f3916508521?w=800&h=600&fit=crop',
                'alt' => 'Dapur bersama Padang',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 20 images - Kost Pekanbaru Unri Premium
            [
                'property_id' => 20,
                'url' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
                'alt' => 'Kamar premium Pekanbaru',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 20,
                'url' => 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas laundry Pekanbaru',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 21 images - Kost Batam UIB Exclusive
            [
                'property_id' => 21,
                'url' => 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
                'alt' => 'Kamar exclusive Batam',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 21,
                'url' => 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
                'alt' => 'Gym exclusive Batam',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 22 images - Kost Palembang Unsri Nyaman
            [
                'property_id' => 22,
                'url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
                'alt' => 'Kamar nyaman Palembang',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 22,
                'url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
                'alt' => 'Dapur bersama Palembang',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 23 images - Kost Balikpapan Uniba Modern
            [
                'property_id' => 23,
                'url' => 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'alt' => 'Kamar modern Balikpapan',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 23,
                'url' => 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
                'alt' => 'Fasilitas gym Balikpapan',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 24 images - Kost Manado Unsrat Strategis
            [
                'property_id' => 24,
                'url' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
                'alt' => 'Kamar strategis Manado',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 24,
                'url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
                'alt' => 'Taman Manado',
                'is_primary' => false,
                'order' => 2,
            ],
            // Property 25 images - Kost Makassar Unhas Premium
            [
                'property_id' => 25,
                'url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
                'alt' => 'Kamar premium Makassar',
                'is_primary' => true,
                'order' => 1,
            ],
            [
                'property_id' => 25,
                'url' => 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
                'alt' => 'Ruang tamu Makassar',
                'is_primary' => false,
                'order' => 2,
            ],
        ];

        foreach ($imageData as $index => $image) {
            $this->downloadAndStoreImage($image, $index + 1);
        }
    }

    /**
     * Download image from URL and store it locally.
     */
    private function downloadAndStoreImage(array $imageData, int $imageId): void
    {
        try {
            // Download the image
            $response = Http::timeout(30)->get($imageData['url']);
            
            if ($response->successful()) {
                // Generate filename
                $extension = 'jpg'; // Unsplash images are typically JPG
                $filename = "kost-image-{$imageId}-" . Str::random(8) . ".{$extension}";
                $path = "kost-images/{$filename}";
                
                // Store the image
                Storage::disk('public')->put($path, $response->body());
                
                // Create database record
                KostImage::create([
                    'property_id' => $imageData['property_id'],
                    'filename' => $filename,
                    'original_name' => basename(parse_url($imageData['url'], PHP_URL_PATH)),
                    'path' => $path,
                    'url' => Storage::url($path),
                    'alt' => $imageData['alt'],
                    'is_primary' => $imageData['is_primary'],
                    'order' => $imageData['order'],
                    'mime_type' => 'image/jpeg',
                    'size' => strlen($response->body()),
                ]);
                
                $this->command->info("Downloaded and stored: {$filename}");
            } else {
                $this->command->error("Failed to download image from: {$imageData['url']}");
                $this->createFallbackImage($imageData, $imageId);
            }
        } catch (\Exception $e) {
            $this->command->error("Error downloading image: {$e->getMessage()}");
            $this->createFallbackImage($imageData, $imageId);
        }
    }

    /**
     * Create a fallback image record with the original URL.
     */
    private function createFallbackImage(array $imageData, int $imageId): void
    {
        KostImage::create([
            'property_id' => $imageData['property_id'],
            'filename' => "fallback-{$imageId}",
            'original_name' => basename(parse_url($imageData['url'], PHP_URL_PATH)),
            'path' => '',
            'url' => $imageData['url'], // Keep original URL as fallback
            'alt' => $imageData['alt'],
            'is_primary' => $imageData['is_primary'],
            'order' => $imageData['order'],
            'mime_type' => 'image/jpeg',
            'size' => 0,
        ]);
        
        $this->command->info("Created fallback record for image {$imageId}");
    }
}
