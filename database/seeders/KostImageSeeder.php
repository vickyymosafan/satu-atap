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
