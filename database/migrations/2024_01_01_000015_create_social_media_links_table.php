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
        Schema::create('social_media_links', function (Blueprint $table) {
            $table->id();
            $table->string('platform_name');
            $table->string('platform_url');
            $table->string('icon'); // Lucide icon name or custom icon
            $table->string('display_name')->nullable(); // Custom display name if different from platform_name
            $table->string('username')->nullable(); // @username for display
            $table->enum('platform_type', ['social', 'messaging', 'professional', 'other'])->default('social');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            // Indexes for better performance
            $table->index(['is_active', 'sort_order']);
            $table->index('platform_type');
            $table->unique('platform_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_media_links');
    }
};
