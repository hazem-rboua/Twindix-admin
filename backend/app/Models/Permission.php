<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    /**
     * Get the group name from the permission name.
     * E.g., 'users.create' -> 'users'
     */
    public function getGroupAttribute(): string
    {
        return explode('.', $this->name)[0] ?? '';
    }

    /**
     * Get the action from the permission name.
     * E.g., 'users.create' -> 'create'
     */
    public function getActionAttribute(): string
    {
        $parts = explode('.', $this->name);
        return $parts[1] ?? '';
    }

    /**
     * Scope permissions by group.
     */
    public function scopeByGroup($query, string $group)
    {
        return $query->where('name', 'like', $group . '.%');
    }
}
