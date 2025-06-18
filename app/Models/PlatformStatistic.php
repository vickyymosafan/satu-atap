<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PlatformStatistic extends Model
{
    use HasFactory;

    protected $fillable = [
        'metric_name',
        'metric_value',
        'metric_label',
        'icon',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only active statistics
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
     * Get statistic by metric name
     */
    public function scopeByMetricName(Builder $query, string $metricName): Builder
    {
        return $query->where('metric_name', $metricName);
    }
}
