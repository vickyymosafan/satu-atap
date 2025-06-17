<?php

namespace Database\Seeders;

use App\Models\KostLocation;
use App\Models\City;
use Illuminate\Database\Seeder;

class KostLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get cities from database to ensure consistency
        $depok = City::where('city', 'Depok')->first();
        $jakartaSelatan = City::where('name', 'Jakarta Selatan')->first();
        $jakartaPusat = City::where('name', 'Jakarta Pusat')->first();
        $jakartaBarat = City::where('name', 'Jakarta Barat')->first();
        $jakartaUtara = City::where('name', 'Jakarta Utara')->first();
        $jakartaTimur = City::where('name', 'Jakarta Timur')->first();
        $bandung = City::where('city', 'Bandung')->first();
        $bekasi = City::where('city', 'Bekasi')->first();
        $bogor = City::where('city', 'Bogor')->first();
        $tangerang = City::where('city', 'Tangerang')->first();
        $tangerangSelatan = City::where('city', 'Tangerang Selatan')->first();
        $yogyakarta = City::where('city', 'Yogyakarta')->first();
        $semarang = City::where('city', 'Semarang')->first();
        $solo = City::where('city', 'Solo')->first();
        $malang = City::where('city', 'Malang')->first();
        $surabaya = City::where('city', 'Surabaya')->first();
        $medan = City::where('city', 'Medan')->first();
        $padang = City::where('city', 'Padang')->first();
        $pekanbaru = City::where('city', 'Pekanbaru')->first();
        $batam = City::where('city', 'Batam')->first();
        $palembang = City::where('city', 'Palembang')->first();
        $balikpapan = City::where('city', 'Balikpapan')->first();
        $manado = City::where('city', 'Manado')->first();
        $makassar = City::where('city', 'Makassar')->first();
        $denpasar = City::where('city', 'Denpasar')->first();

        $locations = [
            [
                'id' => 1,
                'address' => 'Jl. Margonda Raya No. 123',
                'district' => 'Beji',
                'city' => $depok ? $depok->city : 'Depok',
                'province' => $depok ? $depok->province : 'Jawa Barat',
                'postal_code' => '16424',
                'latitude' => -6.3728,
                'longitude' => 106.8317,
                'nearby_landmarks' => ['Universitas Indonesia', 'Stasiun UI', 'Mall Depok'],
            ],
            [
                'id' => 2,
                'address' => 'Jl. Kemang Raya No. 45',
                'district' => 'Kemang',
                'city' => $jakartaSelatan ? $jakartaSelatan->name : 'Jakarta Selatan',
                'province' => $jakartaSelatan ? $jakartaSelatan->province : 'DKI Jakarta',
                'postal_code' => '12560',
                'latitude' => -6.2615,
                'longitude' => 106.8106,
                'nearby_landmarks' => ['Kemang Village', 'Stasiun MRT Cipete', 'Mall Kemang'],
            ],
            [
                'id' => 3,
                'address' => 'Jl. Sudirman No. 89',
                'district' => 'Tanah Abang',
                'city' => $jakartaPusat ? $jakartaPusat->name : 'Jakarta Pusat',
                'province' => $jakartaPusat ? $jakartaPusat->province : 'DKI Jakarta',
                'postal_code' => '10270',
                'latitude' => -6.2088,
                'longitude' => 106.8229,
                'nearby_landmarks' => ['Stasiun Sudirman', 'Plaza Indonesia', 'Grand Indonesia'],
            ],
            [
                'id' => 4,
                'address' => 'Jl. Kebon Jeruk No. 45',
                'district' => 'Kebon Jeruk',
                'city' => $jakartaBarat ? $jakartaBarat->name : 'Jakarta Barat',
                'province' => $jakartaBarat ? $jakartaBarat->province : 'DKI Jakarta',
                'postal_code' => '11530',
                'latitude' => -6.1944,
                'longitude' => 106.7831,
                'nearby_landmarks' => ['Universitas Trisakti', 'Mall Taman Anggrek', 'Stasiun Palmerah'],
            ],
            // Additional Indonesian locations
            [
                'id' => 5,
                'address' => 'Jl. Dago No. 78',
                'district' => 'Coblong',
                'city' => $bandung ? $bandung->city : 'Bandung',
                'province' => $bandung ? $bandung->province : 'Jawa Barat',
                'postal_code' => '40135',
                'latitude' => -6.8951,
                'longitude' => 107.6084,
                'nearby_landmarks' => ['ITB', 'Dago Plaza', 'Cihampelas Walk'],
            ],
            [
                'id' => 6,
                'address' => 'Jl. Malioboro No. 156',
                'district' => 'Gedongtengen',
                'city' => $yogyakarta ? $yogyakarta->city : 'Yogyakarta',
                'province' => $yogyakarta ? $yogyakarta->province : 'DI Yogyakarta',
                'postal_code' => '55271',
                'latitude' => -7.7956,
                'longitude' => 110.3695,
                'nearby_landmarks' => ['UGM', 'Malioboro Street', 'Tugu Station'],
            ],
            [
                'id' => 7,
                'address' => 'Jl. Pemuda No. 89',
                'district' => 'Semarang Tengah',
                'city' => $semarang ? $semarang->city : 'Semarang',
                'province' => $semarang ? $semarang->province : 'Jawa Tengah',
                'postal_code' => '50132',
                'latitude' => -6.9667,
                'longitude' => 110.4167,
                'nearby_landmarks' => ['UNDIP', 'Simpang Lima', 'Lawang Sewu'],
            ],
            [
                'id' => 8,
                'address' => 'Jl. Veteran No. 234',
                'district' => 'Lowokwaru',
                'city' => $malang ? $malang->city : 'Malang',
                'province' => $malang ? $malang->province : 'Jawa Timur',
                'postal_code' => '65145',
                'latitude' => -7.9666,
                'longitude' => 112.6326,
                'nearby_landmarks' => ['Universitas Brawijaya', 'Alun-alun Malang', 'Malang Town Square'],
            ],
            [
                'id' => 9,
                'address' => 'Jl. Raya Darmo No. 67',
                'district' => 'Wonokromo',
                'city' => $surabaya ? $surabaya->city : 'Surabaya',
                'province' => $surabaya ? $surabaya->province : 'Jawa Timur',
                'postal_code' => '60241',
                'latitude' => -7.2575,
                'longitude' => 112.7521,
                'nearby_landmarks' => ['ITS', 'Tunjungan Plaza', 'Surabaya Zoo'],
            ],
            [
                'id' => 10,
                'address' => 'Jl. Gajah Mada No. 123',
                'district' => 'Denpasar Barat',
                'city' => $denpasar ? $denpasar->city : 'Denpasar',
                'province' => $denpasar ? $denpasar->province : 'Bali',
                'postal_code' => '80119',
                'latitude' => -8.6500,
                'longitude' => 115.2167,
                'nearby_landmarks' => ['Universitas Udayana', 'Pasar Badung', 'Bali Museum'],
            ],
            // Additional locations for missing cities
            [
                'id' => 11,
                'address' => 'Jl. Ahmad Yani No. 45',
                'district' => 'Bekasi Utara',
                'city' => $bekasi ? $bekasi->city : 'Bekasi',
                'province' => $bekasi ? $bekasi->province : 'Jawa Barat',
                'postal_code' => '17142',
                'latitude' => -6.2383,
                'longitude' => 106.9756,
                'nearby_landmarks' => ['Mall Bekasi Cyber Park', 'Stasiun Bekasi', 'RSUD Bekasi'],
            ],
            [
                'id' => 12,
                'address' => 'Jl. Pajajaran No. 67',
                'district' => 'Bogor Tengah',
                'city' => $bogor ? $bogor->city : 'Bogor',
                'province' => $bogor ? $bogor->province : 'Jawa Barat',
                'postal_code' => '16121',
                'latitude' => -6.5971,
                'longitude' => 106.8060,
                'nearby_landmarks' => ['IPB University', 'Kebun Raya Bogor', 'Stasiun Bogor'],
            ],
            [
                'id' => 13,
                'address' => 'Jl. Kelapa Dua No. 89',
                'district' => 'Kelapa Dua',
                'city' => $tangerang ? $tangerang->city : 'Tangerang',
                'province' => $tangerang ? $tangerang->province : 'Banten',
                'postal_code' => '15810',
                'latitude' => -6.1781,
                'longitude' => 106.6297,
                'nearby_landmarks' => ['UMN', 'Mall Lippo Karawaci', 'Stasiun Tangerang'],
            ],
            [
                'id' => 14,
                'address' => 'Jl. BSD Raya No. 123',
                'district' => 'Serpong',
                'city' => $tangerangSelatan ? $tangerangSelatan->name : 'Tangerang Selatan',
                'province' => $tangerangSelatan ? $tangerangSelatan->province : 'Banten',
                'postal_code' => '15321',
                'latitude' => -6.3019,
                'longitude' => 106.6644,
                'nearby_landmarks' => ['AEON Mall BSD', 'Universitas Prasetiya Mulya', 'ICE BSD'],
            ],
            [
                'id' => 15,
                'address' => 'Jl. Ancol Timur No. 56',
                'district' => 'Ancol',
                'city' => $jakartaUtara ? $jakartaUtara->name : 'Jakarta Utara',
                'province' => $jakartaUtara ? $jakartaUtara->province : 'DKI Jakarta',
                'postal_code' => '14430',
                'latitude' => -6.1223,
                'longitude' => 106.8317,
                'nearby_landmarks' => ['Ancol Dreamland', 'Pelabuhan Tanjung Priok', 'Mall Kelapa Gading'],
            ],
            [
                'id' => 16,
                'address' => 'Jl. Raya Bekasi No. 78',
                'district' => 'Cakung',
                'city' => $jakartaTimur ? $jakartaTimur->name : 'Jakarta Timur',
                'province' => $jakartaTimur ? $jakartaTimur->province : 'DKI Jakarta',
                'postal_code' => '13910',
                'latitude' => -6.1744,
                'longitude' => 106.9497,
                'nearby_landmarks' => ['Mall Artha Gading', 'Universitas Negeri Jakarta', 'Taman Mini'],
            ],
            [
                'id' => 17,
                'address' => 'Jl. Slamet Riyadi No. 234',
                'district' => 'Laweyan',
                'city' => $solo ? $solo->city : 'Solo',
                'province' => $solo ? $solo->province : 'Jawa Tengah',
                'postal_code' => '57146',
                'latitude' => -7.5755,
                'longitude' => 110.8243,
                'nearby_landmarks' => ['UNS', 'Solo Grand Mall', 'Keraton Surakarta'],
            ],
            [
                'id' => 18,
                'address' => 'Jl. Gatot Subroto No. 45',
                'district' => 'Medan Petisah',
                'city' => $medan ? $medan->city : 'Medan',
                'province' => $medan ? $medan->province : 'Sumatera Utara',
                'postal_code' => '20112',
                'latitude' => 3.5952,
                'longitude' => 98.6722,
                'nearby_landmarks' => ['USU', 'Medan Mall', 'Istana Maimun'],
            ],
            [
                'id' => 19,
                'address' => 'Jl. Prof. Dr. Hamka No. 67',
                'district' => 'Padang Utara',
                'city' => $padang ? $padang->city : 'Padang',
                'province' => $padang ? $padang->province : 'Sumatera Barat',
                'postal_code' => '25173',
                'latitude' => -0.9471,
                'longitude' => 100.4172,
                'nearby_landmarks' => ['Universitas Andalas', 'Pantai Air Manis', 'Plaza Andalas'],
            ],
            [
                'id' => 20,
                'address' => 'Jl. Sudirman No. 89',
                'district' => 'Sukajadi',
                'city' => $pekanbaru ? $pekanbaru->city : 'Pekanbaru',
                'province' => $pekanbaru ? $pekanbaru->province : 'Riau',
                'postal_code' => '28122',
                'latitude' => 0.5071,
                'longitude' => 101.4478,
                'nearby_landmarks' => ['Universitas Riau', 'Mall Pekanbaru', 'Masjid Raya An-Nur'],
            ],
            [
                'id' => 21,
                'address' => 'Jl. Ahmad Yani No. 123',
                'district' => 'Batam Kota',
                'city' => $batam ? $batam->city : 'Batam',
                'province' => $batam ? $batam->province : 'Kepulauan Riau',
                'postal_code' => '29444',
                'latitude' => 1.1304,
                'longitude' => 104.0530,
                'nearby_landmarks' => ['Universitas Internasional Batam', 'Nagoya Hill Mall', 'Barelang Bridge'],
            ],
            [
                'id' => 22,
                'address' => 'Jl. Sudirman No. 156',
                'district' => 'Ilir Barat I',
                'city' => $palembang ? $palembang->city : 'Palembang',
                'province' => $palembang ? $palembang->province : 'Sumatera Selatan',
                'postal_code' => '30137',
                'latitude' => -2.9761,
                'longitude' => 104.7754,
                'nearby_landmarks' => ['Universitas Sriwijaya', 'Palembang Icon Mall', 'Jembatan Ampera'],
            ],
            [
                'id' => 23,
                'address' => 'Jl. Ahmad Yani No. 78',
                'district' => 'Balikpapan Tengah',
                'city' => $balikpapan ? $balikpapan->city : 'Balikpapan',
                'province' => $balikpapan ? $balikpapan->province : 'Kalimantan Timur',
                'postal_code' => '76114',
                'latitude' => -1.2379,
                'longitude' => 116.8529,
                'nearby_landmarks' => ['Universitas Balikpapan', 'Balikpapan Plaza', 'Pantai Kemala'],
            ],
            [
                'id' => 24,
                'address' => 'Jl. Sam Ratulangi No. 234',
                'district' => 'Wenang',
                'city' => $manado ? $manado->city : 'Manado',
                'province' => $manado ? $manado->province : 'Sulawesi Utara',
                'postal_code' => '95115',
                'latitude' => 1.4748,
                'longitude' => 124.8421,
                'nearby_landmarks' => ['Universitas Sam Ratulangi', 'Manado Town Square', 'Bunaken'],
            ],
            [
                'id' => 25,
                'address' => 'Jl. AP Pettarani No. 67',
                'district' => 'Panakkukang',
                'city' => $makassar ? $makassar->city : 'Makassar',
                'province' => $makassar ? $makassar->province : 'Sulawesi Selatan',
                'postal_code' => '90231',
                'latitude' => -5.1477,
                'longitude' => 119.4327,
                'nearby_landmarks' => ['Universitas Hasanuddin', 'Mall Panakkukang', 'Fort Rotterdam'],
            ],
        ];

        foreach ($locations as $location) {
            KostLocation::create($location);
        }
    }
}
