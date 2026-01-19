<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Owner user
        $owner = User::create([
            'name' => 'System Owner',
            'email' => 'owner@twindix.com',
            'password' => Hash::make('password123'),
            'status' => 'active',
        ]);
        $owner->assignRole('Owner');

        // Create Super Admin user
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@twindix.com',
            'password' => Hash::make('password123'),
            'status' => 'active',
            'region_id' => 3, // Middle East
        ]);
        $superAdmin->assignRole('Super Admin');

        // Create Admin user managed by super admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@twindix.com',
            'password' => Hash::make('password123'),
            'status' => 'active',
            'managed_by' => $superAdmin->id,
            'region_id' => 3, // Middle East
        ]);
        $admin->assignRole('Admin');
    }
}
