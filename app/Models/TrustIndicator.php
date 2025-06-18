<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class TrustIndicator extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'icon',
        'badge_type',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only active trust indicators
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
     * Scope to filter by badge type
     */
    public function scopeByBadgeType(Builder $query, string $badgeType): Builder
    {
        return $query->where('badge_type', $badgeType);
    }
}
