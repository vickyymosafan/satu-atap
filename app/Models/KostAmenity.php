<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class KostAmenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'category',
        'is_popular',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
    ];

    /**
     * Get the properties that have this amenity.
     */
    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(KostProperty::class, 'kost_property_amenity', 'amenity_id', 'property_id');
    }
}
