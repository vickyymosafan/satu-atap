<?php

namespace Database\Seeders;

use App\Models\VerificationBadge;
use Illuminate\Database\Seeder;

class VerificationBadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            [
                'title' => 'Terpercaya',
                'description' => 'Platform terpercaya dengan ribuan pengguna aktif',
                'icon' => 'Shield',
                'badge_color' => 'blue',
                'sort_order' => 1,
            ],
            [
                'title' => 'Aman',
                'description' => 'Transaksi dan data pribadi dijamin aman',
                'icon' => 'ShieldCheck',
                'badge_color' => 'green',
                'sort_order' => 2,
            ],
            [
                'title' => 'Berkualitas',
                'description' => 'Properti berkualitas tinggi dan terverifikasi',
                'icon' => 'Star',
                'badge_color' => 'yellow',
                'sort_order' => 3,
            ],
            [
                'title' => 'Responsif',
                'description' => 'Customer service responsif dan profesional',
                'icon' => 'MessageCircle',
                'badge_color' => 'purple',
                'sort_order' => 4,
            ],
        ];

        foreach ($badges as $badge) {
            VerificationBadge::create($badge);
        }
    }
}
