<?php

namespace Database\Seeders;

use App\Models\FaqItem;
use Illuminate\Database\Seeder;

class FaqItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqItems = [
            // General FAQs
            [
                'question' => 'Apa itu Satu Atap?',
                'answer' => 'Satu Atap adalah platform digital yang menghubungkan pencari kost dengan pemilik properti kost di seluruh Indonesia. Kami menyediakan layanan pencarian, booking, dan manajemen kost yang mudah dan terpercaya.',
                'category' => 'general',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'question' => 'Bagaimana cara mencari kost di Satu Atap?',
                'answer' => 'Anda dapat mencari kost dengan menggunakan fitur pencarian di halaman utama. Masukkan lokasi yang diinginkan, atur filter harga dan fasilitas, lalu tekan tombol cari. Sistem akan menampilkan daftar kost yang sesuai dengan kriteria Anda.',
                'category' => 'general',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'question' => 'Apakah layanan Satu Atap gratis?',
                'answer' => 'Ya, layanan pencarian dan browsing kost di Satu Atap sepenuhnya gratis untuk pengguna. Kami tidak mengenakan biaya untuk melihat informasi properti atau menghubungi pemilik kost.',
                'category' => 'general',
                'is_featured' => true,
                'sort_order' => 3,
            ],

            // Booking FAQs
            [
                'question' => 'Bagaimana cara booking kost?',
                'answer' => 'Setelah menemukan kost yang diinginkan, klik tombol "Hubungi Pemilik" atau "Book Now". Anda akan diarahkan untuk menghubungi pemilik kost langsung melalui WhatsApp atau telepon untuk melakukan reservasi.',
                'category' => 'booking',
                'is_featured' => false,
                'sort_order' => 4,
            ],
            [
                'question' => 'Apakah bisa booking kost secara online?',
                'answer' => 'Saat ini booking dilakukan melalui komunikasi langsung dengan pemilik kost. Fitur booking online sedang dalam pengembangan dan akan segera tersedia untuk memberikan pengalaman yang lebih mudah.',
                'category' => 'booking',
                'is_featured' => false,
                'sort_order' => 5,
            ],
            [
                'question' => 'Bagaimana jika kost yang saya inginkan sudah penuh?',
                'answer' => 'Jika kost sudah penuh, Anda dapat menggunakan fitur "Notify Me" untuk mendapatkan notifikasi ketika ada kamar yang tersedia, atau mencari alternatif kost lain di area yang sama.',
                'category' => 'booking',
                'is_featured' => false,
                'sort_order' => 6,
            ],

            // Payment FAQs
            [
                'question' => 'Apa saja metode pembayaran yang tersedia?',
                'answer' => 'Metode pembayaran tergantung pada kebijakan masing-masing pemilik kost. Umumnya tersedia transfer bank, e-wallet, dan pembayaran tunai. Detail pembayaran akan dijelaskan saat komunikasi dengan pemilik kost.',
                'category' => 'payment',
                'is_featured' => false,
                'sort_order' => 7,
            ],
            [
                'question' => 'Apakah ada biaya deposit?',
                'answer' => 'Kebijakan deposit berbeda-beda untuk setiap kost. Informasi mengenai deposit, termasuk jumlah dan syarat pengembalian, akan dijelaskan oleh pemilik kost saat proses booking.',
                'category' => 'payment',
                'is_featured' => false,
                'sort_order' => 8,
            ],

            // Property FAQs
            [
                'question' => 'Bagaimana cara memastikan kost yang dipilih aman?',
                'answer' => 'Semua kost di Satu Atap telah melalui proses verifikasi. Kami juga menyediakan foto asli, review dari penghuni sebelumnya, dan informasi detail fasilitas keamanan untuk membantu Anda membuat keputusan.',
                'category' => 'property',
                'is_featured' => true,
                'sort_order' => 9,
            ],
            [
                'question' => 'Apakah foto kost yang ditampilkan asli?',
                'answer' => 'Ya, kami memastikan semua foto yang ditampilkan adalah foto asli dari properti. Tim verifikasi kami melakukan pengecekan untuk memastikan keaslian foto dan informasi yang diberikan.',
                'category' => 'property',
                'is_featured' => false,
                'sort_order' => 10,
            ],

            // Account FAQs
            [
                'question' => 'Apakah harus membuat akun untuk menggunakan Satu Atap?',
                'answer' => 'Tidak, Anda dapat browsing dan mencari kost tanpa membuat akun. Namun, dengan membuat akun Anda dapat menyimpan kost favorit, mendapatkan rekomendasi personal, dan akses fitur premium lainnya.',
                'category' => 'account',
                'is_featured' => false,
                'sort_order' => 11,
            ],
            [
                'question' => 'Bagaimana cara mengubah informasi profil?',
                'answer' => 'Setelah login, klik menu "Profil" di pojok kanan atas, lalu pilih "Edit Profil". Anda dapat mengubah nama, email, nomor telepon, dan informasi lainnya sesuai kebutuhan.',
                'category' => 'account',
                'is_featured' => false,
                'sort_order' => 12,
            ],

            // Technical FAQs
            [
                'question' => 'Mengapa website tidak bisa diakses?',
                'answer' => 'Jika mengalami masalah akses, coba refresh halaman atau clear cache browser. Jika masalah berlanjut, hubungi technical support kami di +62 21 1500 123 atau email support@satuatap.id.',
                'category' => 'technical',
                'is_featured' => false,
                'sort_order' => 13,
            ],
            [
                'question' => 'Apakah ada aplikasi mobile Satu Atap?',
                'answer' => 'Aplikasi mobile Satu Atap sedang dalam tahap pengembangan. Saat ini Anda dapat mengakses layanan kami melalui website yang sudah dioptimasi untuk mobile browser.',
                'category' => 'technical',
                'is_featured' => false,
                'sort_order' => 14,
            ],
        ];

        foreach ($faqItems as $faq) {
            FaqItem::create($faq);
        }
    }
}
