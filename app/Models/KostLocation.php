<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KostLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'district',
        'city',
        'province',
        'postal_code',
        'latitude',
        'longitude',
        'nearby_landmarks',
    ];

    protected $casts = [
        'nearby_landmarks' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    /**
     * Get the properties for this location.
     */
    public function properties(): HasMany
    {
        return $this->hasMany(KostProperty::class, 'location_id');
    }
}
