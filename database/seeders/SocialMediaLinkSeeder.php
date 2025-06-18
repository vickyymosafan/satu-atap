<?php

namespace Database\Seeders;

use App\Models\SocialMediaLink;
use Illuminate\Database\Seeder;

class SocialMediaLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $socialMediaLinks = [
            [
                'platform_name' => 'Instagram',
                'platform_url' => 'https://instagram.com/satuatap.id',
                'icon' => 'Instagram',
                'display_name' => 'Instagram',
                'username' => 'satuatap.id',
                'platform_type' => 'social',
                'sort_order' => 1,
            ],
            [
                'platform_name' => 'Facebook',
                'platform_url' => 'https://facebook.com/satuatap.id',
                'icon' => 'Facebook',
                'display_name' => 'Facebook',
                'username' => 'satuatap.id',
                'platform_type' => 'social',
                'sort_order' => 2,
            ],
            [
                'platform_name' => 'Twitter',
                'platform_url' => 'https://twitter.com/satuatap_id',
                'icon' => 'Twitter',
                'display_name' => 'Twitter',
                'username' => 'satuatap_id',
                'platform_type' => 'social',
                'sort_order' => 3,
            ],
            [
                'platform_name' => 'WhatsApp',
                'platform_url' => 'https://wa.me/6281234567890',
                'icon' => 'MessageCircle',
                'display_name' => 'WhatsApp',
                'username' => '+62 812 3456 7890',
                'platform_type' => 'messaging',
                'sort_order' => 4,
            ],
            [
                'platform_name' => 'Telegram',
                'platform_url' => 'https://t.me/satuatap_id',
                'icon' => 'Send',
                'display_name' => 'Telegram',
                'username' => 'satuatap_id',
                'platform_type' => 'messaging',
                'sort_order' => 5,
            ],
            [
                'platform_name' => 'LinkedIn',
                'platform_url' => 'https://linkedin.com/company/satu-atap',
                'icon' => 'Linkedin',
                'display_name' => 'LinkedIn',
                'username' => 'satu-atap',
                'platform_type' => 'professional',
                'sort_order' => 6,
            ],
            [
                'platform_name' => 'YouTube',
                'platform_url' => 'https://youtube.com/@satuatap',
                'icon' => 'Youtube',
                'display_name' => 'YouTube',
                'username' => 'satuatap',
                'platform_type' => 'social',
                'sort_order' => 7,
            ],
            [
                'platform_name' => 'TikTok',
                'platform_url' => 'https://tiktok.com/@satuatap.id',
                'icon' => 'Music',
                'display_name' => 'TikTok',
                'username' => 'satuatap.id',
                'platform_type' => 'social',
                'sort_order' => 8,
            ],
        ];

        foreach ($socialMediaLinks as $link) {
            SocialMediaLink::create($link);
        }
    }
}
