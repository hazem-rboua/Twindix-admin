<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'phone_code',
    ];

    /**
     * Get the regions that include this country.
     */
    public function regions(): BelongsToMany
    {
        return $this->belongsToMany(Region::class, 'region_countries');
    }
}
