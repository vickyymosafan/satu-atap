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
        Schema::create('platform_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('metric_name');
            $table->string('metric_value'); // Store as string to handle different formats (1000+, 99%, etc.)
            $table->string('metric_label');
            $table->string('icon'); // Lucide icon name
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            // Indexes for better performance
            $table->index(['is_active', 'sort_order']);
            $table->unique('metric_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('platform_statistics');
    }
};
