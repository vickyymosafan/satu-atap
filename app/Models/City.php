<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'province',
        'type',
        'postal_code',
        'latitude',
        'longitude',
        'is_popular',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only active cities
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get popular cities
     */
    public function scopePopular(Builder $query): Builder
    {
        return $query->where('is_popular', true);
    }

    /**
     * Scope to search cities by name, city, or province
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('city', 'like', "%{$search}%")
              ->orWhere('province', 'like', "%{$search}%");
        });
    }

    /**
     * Scope to filter by province
     */
    public function scopeByProvince(Builder $query, string $province): Builder
    {
        return $query->where('province', $province);
    }

    /**
     * Scope to filter by type
     */
    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to order by custom sort order and name
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order', 'asc')
                    ->orderBy('name', 'asc');
    }

    /**
     * Get the full display name (name, province)
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->name}, {$this->province}";
    }

    /**
     * Get unique cities (grouped by city name)
     */
    public static function getUniqueCities()
    {
        return static::active()
            ->select('city', 'province')
            ->groupBy('city', 'province')
            ->orderBy('city')
            ->get();
    }

    /**
     * Search cities with autocomplete functionality
     */
    public static function autocomplete(string $search, int $limit = 10)
    {
        return static::active()
            ->search($search)
            ->ordered()
            ->limit($limit)
            ->get();
    }

    /**
     * Get all provinces
     */
    public static function getProvinces()
    {
        return static::active()
            ->select('province')
            ->distinct()
            ->orderBy('province')
            ->pluck('province');
    }
}
