<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $owner = Role::create(['name' => 'Owner', 'guard_name' => 'web']);
        $superAdmin = Role::create(['name' => 'Super Admin', 'guard_name' => 'web']);
        $admin = Role::create(['name' => 'Admin', 'guard_name' => 'web']);

        // Give owner all permissions
        $allPermissions = Permission::all();
        $owner->givePermissionTo($allPermissions);

        // Give super admin most permissions (except some sensitive ones)
        $superAdminPermissions = Permission::whereNotIn('name', [
            'permissions.update',
        ])->get();
        $superAdmin->givePermissionTo($superAdminPermissions);

        // Give admin basic permissions
        $adminPermissions = Permission::whereIn('name', [
            'users.read',
            'regions.read',
            'types.read',
        ])->get();
        $admin->givePermissionTo($adminPermissions);
    }
}
