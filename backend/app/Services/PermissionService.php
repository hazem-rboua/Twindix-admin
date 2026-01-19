<?php

namespace App\Services;

use App\Models\UserSubType;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionService
{
    /**
     * Get permissions by role, type, and subtype.
     */
    public function getPermissionsByRoleTypeSubtype(?int $roleId, ?int $typeId, ?int $subTypeId): array
    {
        $permissions = [];

        // Get role permissions
        if ($roleId) {
            $role = Role::find($roleId);
            if ($role) {
                $permissions['role_permissions'] = $role->permissions->pluck('name')->toArray();
            }
        }

        // Get subtype permissions
        if ($subTypeId) {
            $subType = UserSubType::with('permissions')->find($subTypeId);
            if ($subType) {
                $permissions['subtype_permissions'] = $subType->permissions->pluck('name')->toArray();
            }
        }

        // Get all available permissions grouped
        $permissions['available_permissions'] = $this->getGroupedPermissions();

        return $permissions;
    }

    /**
     * Assign permissions to role and/or subtype.
     */
    public function assignPermissions(?int $roleId, ?int $subTypeId, array $permissionNames): void
    {
        $permissions = Permission::whereIn('name', $permissionNames)->get();

        if ($roleId) {
            $role = Role::findOrFail($roleId);
            $role->syncPermissions($permissions);
            
            // Log activity
            activity()
                ->performedOn($role)
                ->withProperties(['permissions' => $permissionNames])
                ->log('updated role permissions');
        }

        if ($subTypeId) {
            $subType = UserSubType::findOrFail($subTypeId);
            $subType->permissions()->sync($permissions->pluck('id'));
            
            // Log activity
            activity()
                ->performedOn($subType)
                ->withProperties(['permissions' => $permissionNames])
                ->log('updated subtype permissions');
        }
    }

    /**
     * Get all permissions grouped by their category.
     */
    public function getGroupedPermissions(): array
    {
        $permissions = Permission::all();
        $grouped = [];

        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $group = $parts[0] ?? 'other';
            $action = $parts[1] ?? $permission->name;

            if (!isset($grouped[$group])) {
                $grouped[$group] = [
                    'group' => ucwords(str_replace('-', ' ', $group)),
                    'permissions' => [],
                ];
            }

            $grouped[$group]['permissions'][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'action' => $action,
            ];
        }

        return array_values($grouped);
    }
}
