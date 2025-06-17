<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index(); // City name (e.g., "Jakarta Selatan", "Bandung")
            $table->string('city')->index(); // Main city name (e.g., "Jakarta", "Bandung")
            $table->string('province')->index(); // Province name
            $table->enum('type', ['city', 'district', 'area'])->default('city');
            $table->string('postal_code')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_popular')->default(false)->index(); // For popular cities
            $table->integer('sort_order')->default(0)->index(); // For custom sorting
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();

            // Indexes for better performance
            $table->index(['province', 'city']);
            $table->index(['is_popular', 'sort_order']);
            $table->index(['is_active', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
