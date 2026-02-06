<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class UserSubType extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'user_type_id',
        'name',
        'description',
    ];

    /**
     * Get the activity log options.
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['user_type_id', 'name', 'description'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    /**
     * Get the user type that owns this sub-type.
     */
    public function userType(): BelongsTo
    {
        return $this->belongsTo(UserType::class);
    }

    /**
     * Get the permissions associated with this sub-type.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            \Spatie\Permission\Models\Permission::class,
            'sub_type_permissions',
            'user_sub_type_id',
            'permission_id'
        );
    }

    /**
     * Get the users of this sub-type.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
