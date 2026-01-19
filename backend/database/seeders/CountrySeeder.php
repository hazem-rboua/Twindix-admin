<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            // Africa
            ['name' => 'Algeria', 'code' => 'DZ', 'phone_code' => '+213'],
            ['name' => 'Egypt', 'code' => 'EG', 'phone_code' => '+20'],
            ['name' => 'Kenya', 'code' => 'KE', 'phone_code' => '+254'],
            ['name' => 'Morocco', 'code' => 'MA', 'phone_code' => '+212'],
            ['name' => 'Nigeria', 'code' => 'NG', 'phone_code' => '+234'],
            ['name' => 'South Africa', 'code' => 'ZA', 'phone_code' => '+27'],
            ['name' => 'Tunisia', 'code' => 'TN', 'phone_code' => '+216'],
            
            // Asia
            ['name' => 'Afghanistan', 'code' => 'AF', 'phone_code' => '+93'],
            ['name' => 'Bahrain', 'code' => 'BH', 'phone_code' => '+973'],
            ['name' => 'Bangladesh', 'code' => 'BD', 'phone_code' => '+880'],
            ['name' => 'China', 'code' => 'CN', 'phone_code' => '+86'],
            ['name' => 'India', 'code' => 'IN', 'phone_code' => '+91'],
            ['name' => 'Indonesia', 'code' => 'ID', 'phone_code' => '+62'],
            ['name' => 'Iran', 'code' => 'IR', 'phone_code' => '+98'],
            ['name' => 'Iraq', 'code' => 'IQ', 'phone_code' => '+964'],
            ['name' => 'Israel', 'code' => 'IL', 'phone_code' => '+972'],
            ['name' => 'Japan', 'code' => 'JP', 'phone_code' => '+81'],
            ['name' => 'Jordan', 'code' => 'JO', 'phone_code' => '+962'],
            ['name' => 'Kuwait', 'code' => 'KW', 'phone_code' => '+965'],
            ['name' => 'Lebanon', 'code' => 'LB', 'phone_code' => '+961'],
            ['name' => 'Malaysia', 'code' => 'MY', 'phone_code' => '+60'],
            ['name' => 'Oman', 'code' => 'OM', 'phone_code' => '+968'],
            ['name' => 'Pakistan', 'code' => 'PK', 'phone_code' => '+92'],
            ['name' => 'Palestine', 'code' => 'PS', 'phone_code' => '+970'],
            ['name' => 'Philippines', 'code' => 'PH', 'phone_code' => '+63'],
            ['name' => 'Qatar', 'code' => 'QA', 'phone_code' => '+974'],
            ['name' => 'Saudi Arabia', 'code' => 'SA', 'phone_code' => '+966'],
            ['name' => 'Singapore', 'code' => 'SG', 'phone_code' => '+65'],
            ['name' => 'South Korea', 'code' => 'KR', 'phone_code' => '+82'],
            ['name' => 'Sri Lanka', 'code' => 'LK', 'phone_code' => '+94'],
            ['name' => 'Syria', 'code' => 'SY', 'phone_code' => '+963'],
            ['name' => 'Taiwan', 'code' => 'TW', 'phone_code' => '+886'],
            ['name' => 'Thailand', 'code' => 'TH', 'phone_code' => '+66'],
            ['name' => 'Turkey', 'code' => 'TR', 'phone_code' => '+90'],
            ['name' => 'United Arab Emirates', 'code' => 'AE', 'phone_code' => '+971'],
            ['name' => 'Vietnam', 'code' => 'VN', 'phone_code' => '+84'],
            ['name' => 'Yemen', 'code' => 'YE', 'phone_code' => '+967'],
            
            // Europe
            ['name' => 'Austria', 'code' => 'AT', 'phone_code' => '+43'],
            ['name' => 'Belgium', 'code' => 'BE', 'phone_code' => '+32'],
            ['name' => 'Bulgaria', 'code' => 'BG', 'phone_code' => '+359'],
            ['name' => 'Croatia', 'code' => 'HR', 'phone_code' => '+385'],
            ['name' => 'Czech Republic', 'code' => 'CZ', 'phone_code' => '+420'],
            ['name' => 'Denmark', 'code' => 'DK', 'phone_code' => '+45'],
            ['name' => 'Finland', 'code' => 'FI', 'phone_code' => '+358'],
            ['name' => 'France', 'code' => 'FR', 'phone_code' => '+33'],
            ['name' => 'Germany', 'code' => 'DE', 'phone_code' => '+49'],
            ['name' => 'Greece', 'code' => 'GR', 'phone_code' => '+30'],
            ['name' => 'Hungary', 'code' => 'HU', 'phone_code' => '+36'],
            ['name' => 'Ireland', 'code' => 'IE', 'phone_code' => '+353'],
            ['name' => 'Italy', 'code' => 'IT', 'phone_code' => '+39'],
            ['name' => 'Netherlands', 'code' => 'NL', 'phone_code' => '+31'],
            ['name' => 'Norway', 'code' => 'NO', 'phone_code' => '+47'],
            ['name' => 'Poland', 'code' => 'PL', 'phone_code' => '+48'],
            ['name' => 'Portugal', 'code' => 'PT', 'phone_code' => '+351'],
            ['name' => 'Romania', 'code' => 'RO', 'phone_code' => '+40'],
            ['name' => 'Russia', 'code' => 'RU', 'phone_code' => '+7'],
            ['name' => 'Spain', 'code' => 'ES', 'phone_code' => '+34'],
            ['name' => 'Sweden', 'code' => 'SE', 'phone_code' => '+46'],
            ['name' => 'Switzerland', 'code' => 'CH', 'phone_code' => '+41'],
            ['name' => 'Ukraine', 'code' => 'UA', 'phone_code' => '+380'],
            ['name' => 'United Kingdom', 'code' => 'GB', 'phone_code' => '+44'],
            
            // North America
            ['name' => 'Canada', 'code' => 'CA', 'phone_code' => '+1'],
            ['name' => 'Mexico', 'code' => 'MX', 'phone_code' => '+52'],
            ['name' => 'United States', 'code' => 'US', 'phone_code' => '+1'],
            
            // South America
            ['name' => 'Argentina', 'code' => 'AR', 'phone_code' => '+54'],
            ['name' => 'Brazil', 'code' => 'BR', 'phone_code' => '+55'],
            ['name' => 'Chile', 'code' => 'CL', 'phone_code' => '+56'],
            ['name' => 'Colombia', 'code' => 'CO', 'phone_code' => '+57'],
            ['name' => 'Peru', 'code' => 'PE', 'phone_code' => '+51'],
            ['name' => 'Venezuela', 'code' => 'VE', 'phone_code' => '+58'],
            
            // Oceania
            ['name' => 'Australia', 'code' => 'AU', 'phone_code' => '+61'],
            ['name' => 'New Zealand', 'code' => 'NZ', 'phone_code' => '+64'],
        ];

        foreach ($countries as $country) {
            DB::table('countries')->insert([
                'name' => $country['name'],
                'code' => $country['code'],
                'phone_code' => $country['phone_code'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
