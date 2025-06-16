<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KostProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price_monthly',
        'price_daily',
        'property_type',
        'room_type',
        'available_rooms',
        'total_rooms',
        'location_id',
        'rating',
        'review_count',
        'is_featured',
        'is_verified',
        'owner_name',
        'owner_phone',
        'owner_avatar',
        'owner_response_rate',
        'owner_response_time',
        'rules',
        'facilities',
    ];

    protected $casts = [
        'price_monthly' => 'integer',
        'price_daily' => 'integer',
        'available_rooms' => 'integer',
        'total_rooms' => 'integer',
        'rating' => 'decimal:2',
        'review_count' => 'integer',
        'is_featured' => 'boolean',
        'is_verified' => 'boolean',
        'owner_response_rate' => 'integer',
        'rules' => 'array',
        'facilities' => 'array',
    ];

    /**
     * Get the location for this property.
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(KostLocation::class, 'location_id');
    }

    /**
     * Get the images for this property.
     */
    public function images(): HasMany
    {
        return $this->hasMany(KostImage::class, 'property_id')->orderBy('order');
    }

    /**
     * Get the primary image for this property.
     */
    public function primaryImage(): HasMany
    {
        return $this->hasMany(KostImage::class, 'property_id')->where('is_primary', true);
    }

    /**
     * Get the amenities for this property.
     */
    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(KostAmenity::class, 'kost_property_amenity', 'property_id', 'amenity_id');
    }

    /**
     * Scope to get featured properties.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope to get verified properties.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}
