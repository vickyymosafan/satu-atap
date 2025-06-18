<?php

namespace Database\Seeders;

use App\Models\CompanyBenefit;
use Illuminate\Database\Seeder;

class CompanyBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $benefits = [
            [
                'title' => 'Pencarian Mudah & Cepat',
                'description' => 'Temukan kost impian Anda dengan sistem pencarian canggih berdasarkan lokasi, harga, dan fasilitas yang diinginkan.',
                'icon' => 'Search',
                'category' => 'technology',
                'sort_order' => 1,
            ],
            [
                'title' => 'Properti Terverifikasi',
                'description' => 'Semua properti telah melalui proses verifikasi ketat untuk memastikan kualitas dan keamanan tempat tinggal Anda.',
                'icon' => 'ShieldCheck',
                'category' => 'quality',
                'sort_order' => 2,
            ],
            [
                'title' => 'Harga Transparan',
                'description' => 'Tidak ada biaya tersembunyi. Semua informasi harga dan biaya tambahan ditampilkan dengan jelas dan transparan.',
                'icon' => 'DollarSign',
                'category' => 'service',
                'sort_order' => 3,
            ],
            [
                'title' => 'Customer Support 24/7',
                'description' => 'Tim customer service kami siap membantu Anda kapan saja untuk menjawab pertanyaan dan menyelesaikan masalah.',
                'icon' => 'Headphones',
                'category' => 'support',
                'sort_order' => 4,
            ],
            [
                'title' => 'Booking Online Aman',
                'description' => 'Sistem booking online yang aman dengan berbagai metode pembayaran dan perlindungan data pribadi terjamin.',
                'icon' => 'CreditCard',
                'category' => 'technology',
                'sort_order' => 5,
            ],
            [
                'title' => 'Review & Rating Terpercaya',
                'description' => 'Baca review dan rating dari penghuni sebelumnya untuk membantu Anda membuat keputusan yang tepat.',
                'icon' => 'Star',
                'category' => 'quality',
                'sort_order' => 6,
            ],
        ];

        foreach ($benefits as $benefit) {
            CompanyBenefit::create($benefit);
        }
    }
}
