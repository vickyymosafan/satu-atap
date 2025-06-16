<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class KostImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'filename',
        'original_name',
        'path',
        'url',
        'alt',
        'is_primary',
        'order',
        'mime_type',
        'size',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'order' => 'integer',
        'size' => 'integer',
    ];

    /**
     * Get the property that owns this image.
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(KostProperty::class, 'property_id');
    }

    /**
     * Get the full URL for the image.
     */
    public function getFullUrlAttribute(): string
    {
        // If URL is already a full URL (external), return it
        if (filter_var($this->url, FILTER_VALIDATE_URL)) {
            return $this->url;
        }

        // If path exists, use storage URL
        if ($this->path) {
            return Storage::url($this->path);
        }

        // Fallback to URL field
        return $this->url;
    }
}
