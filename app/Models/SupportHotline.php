<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SupportHotline extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'phone_number',
        'whatsapp_number',
        'description',
        'available_hours',
        'hotline_type',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Scope to get only active hotlines
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
     * Scope to filter by hotline type
     */
    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('hotline_type', $type);
    }

    /**
     * Get formatted phone number for display
     */
    public function getFormattedPhoneAttribute(): string
    {
        return $this->formatPhoneNumber($this->phone_number);
    }

    /**
     * Get formatted WhatsApp number for display
     */
    public function getFormattedWhatsappAttribute(): ?string
    {
        return $this->whatsapp_number ? $this->formatPhoneNumber($this->whatsapp_number) : null;
    }

    /**
     * Format phone number for display
     */
    private function formatPhoneNumber(string $phone): string
    {
        // Remove all non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);
        
        // Format Indonesian phone numbers
        if (str_starts_with($phone, '62')) {
            return '+' . substr($phone, 0, 2) . ' ' . substr($phone, 2, 3) . ' ' . substr($phone, 5, 4) . ' ' . substr($phone, 9);
        }
        
        return $phone;
    }
}
