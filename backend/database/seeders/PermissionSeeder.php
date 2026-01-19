<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permission groups
        $permissionGroups = [
            'Users' => ['create', 'read', 'update', 'delete'],
            'Permissions' => ['read', 'update'],
            'Regions' => ['create', 'read', 'update', 'delete'],
            'Types' => ['create', 'read', 'update', 'delete'],
            'Super Admins' => ['create', 'read', 'update', 'delete', 'pause', 'resume'],
        ];

        foreach ($permissionGroups as $group => $actions) {
            foreach ($actions as $action) {
                Permission::create([
                    'name' => strtolower(str_replace(' ', '-', $group)) . '.' . $action,
                    'guard_name' => 'web',
                ]);
            }
        }
    }
}
