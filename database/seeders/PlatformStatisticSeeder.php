<?php

namespace Database\Seeders;

use App\Models\PlatformStatistic;
use Illuminate\Database\Seeder;

class PlatformStatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            [
                'metric_name' => 'total_properties',
                'metric_value' => '10,000+',
                'metric_label' => 'Properti Kost',
                'icon' => 'Building2',
                'sort_order' => 1,
            ],
            [
                'metric_name' => 'happy_customers',
                'metric_value' => '50,000+',
                'metric_label' => 'Pengguna Puas',
                'icon' => 'Users',
                'sort_order' => 2,
            ],
            [
                'metric_name' => 'cities_covered',
                'metric_value' => '100+',
                'metric_label' => 'Kota di Indonesia',
                'icon' => 'MapPin',
                'sort_order' => 3,
            ],
            [
                'metric_name' => 'success_rate',
                'metric_value' => '98%',
                'metric_label' => 'Tingkat Kepuasan',
                'icon' => 'TrendingUp',
                'sort_order' => 4,
            ],
        ];

        foreach ($statistics as $statistic) {
            PlatformStatistic::create($statistic);
        }
    }
}
