<?php

namespace Database\Seeders;

use App\Models\TrustIndicator;
use Illuminate\Database\Seeder;

class TrustIndicatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trustIndicators = [
            [
                'title' => 'SSL Secured',
                'description' => 'Website dilindungi dengan enkripsi SSL untuk keamanan data Anda',
                'icon' => 'Lock',
                'badge_type' => 'security',
                'sort_order' => 1,
            ],
            [
                'title' => 'Verified Business',
                'description' => 'Perusahaan terdaftar dan terverifikasi secara resmi',
                'icon' => 'BadgeCheck',
                'badge_type' => 'verification',
                'sort_order' => 2,
            ],
            [
                'title' => 'ISO 27001 Certified',
                'description' => 'Standar keamanan informasi internasional',
                'icon' => 'Award',
                'badge_type' => 'quality',
                'sort_order' => 3,
            ],
            [
                'title' => '99.9% Uptime',
                'description' => 'Platform tersedia 24/7 dengan tingkat keandalan tinggi',
                'icon' => 'Activity',
                'badge_type' => 'service',
                'sort_order' => 4,
            ],
        ];

        foreach ($trustIndicators as $indicator) {
            TrustIndicator::create($indicator);
        }
    }
}
