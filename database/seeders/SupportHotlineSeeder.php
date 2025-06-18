<?php

namespace Database\Seeders;

use App\Models\SupportHotline;
use Illuminate\Database\Seeder;

class SupportHotlineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hotlines = [
            [
                'title' => 'Customer Service',
                'phone_number' => '+62 21 1500 888',
                'whatsapp_number' => '+62 812 3456 7890',
                'description' => 'Bantuan umum untuk pertanyaan seputar layanan Satu Atap',
                'available_hours' => '24/7',
                'hotline_type' => 'general',
                'sort_order' => 1,
            ],
            [
                'title' => 'Emergency Support',
                'phone_number' => '+62 21 1500 911',
                'whatsapp_number' => '+62 812 9876 5432',
                'description' => 'Bantuan darurat untuk masalah mendesak di properti kost',
                'available_hours' => '24/7',
                'hotline_type' => 'emergency',
                'sort_order' => 2,
            ],
            [
                'title' => 'Technical Support',
                'phone_number' => '+62 21 1500 123',
                'whatsapp_number' => '+62 812 1111 2222',
                'description' => 'Bantuan teknis untuk masalah aplikasi dan website',
                'available_hours' => 'Senin-Jumat 08:00-17:00',
                'hotline_type' => 'technical',
                'sort_order' => 3,
            ],
            [
                'title' => 'Billing Support',
                'phone_number' => '+62 21 1500 456',
                'whatsapp_number' => '+62 812 3333 4444',
                'description' => 'Bantuan untuk masalah pembayaran dan tagihan',
                'available_hours' => 'Senin-Jumat 09:00-16:00',
                'hotline_type' => 'billing',
                'sort_order' => 4,
            ],
        ];

        foreach ($hotlines as $hotline) {
            SupportHotline::create($hotline);
        }
    }
}
