<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SocialMediaLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform_name',
        'platform_url',
        'icon',
        'display_name',
        'username',
        'platform_type',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only active social media links
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by sort_order
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Scope to filter by platform type
     */
    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('platform_type', $type);
    }

    /**
     * Get display name or fallback to platform name
     */
    public function getDisplayNameAttribute($value): string
    {
        return $value ?: $this->platform_name;
    }

    /**
     * Get formatted username with @ prefix
     */
    public function getFormattedUsernameAttribute(): ?string
    {
        return $this->username ? '@' . ltrim($this->username, '@') : null;
    }

    /**
     * Check if URL is valid
     */
    public function isValidUrl(): bool
    {
        return filter_var($this->platform_url, FILTER_VALIDATE_URL) !== false;
    }
}
