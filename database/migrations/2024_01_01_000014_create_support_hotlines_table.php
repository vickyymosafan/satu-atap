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
        Schema::create('support_hotlines', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('phone_number');
            $table->string('whatsapp_number')->nullable();
            $table->text('description');
            $table->string('available_hours')->default('24/7');
            $table->enum('hotline_type', ['general', 'emergency', 'technical', 'billing'])->default('general');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            // Indexes for better performance
            $table->index(['is_active', 'sort_order']);
            $table->index('hotline_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_hotlines');
    }
};
