<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            [
                'name' => 'North America',
                'code' => 'NA',
                'description' => 'North American Region',
                'countries' => ['US', 'CA', 'MX'],
            ],
            [
                'name' => 'Europe',
                'code' => 'EU',
                'description' => 'European Region',
                'countries' => ['GB', 'FR', 'DE', 'IT', 'ES'],
            ],
            [
                'name' => 'Middle East',
                'code' => 'ME',
                'description' => 'Middle East Region',
                'countries' => ['AE', 'SA', 'EG', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB'],
            ],
            [
                'name' => 'Asia Pacific',
                'code' => 'APAC',
                'description' => 'Asia Pacific Region',
                'countries' => ['CN', 'JP', 'IN', 'SG', 'AU', 'KR'],
            ],
        ];

        foreach ($regions as $regionData) {
            $regionId = DB::table('regions')->insertGetId([
                'name' => $regionData['name'],
                'code' => $regionData['code'],
                'description' => $regionData['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Attach countries to region
            foreach ($regionData['countries'] as $countryCode) {
                $countryId = DB::table('countries')
                    ->where('code', $countryCode)
                    ->value('id');

                if ($countryId) {
                    DB::table('region_countries')->insert([
                        'region_id' => $regionId,
                        'country_id' => $countryId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }
}
