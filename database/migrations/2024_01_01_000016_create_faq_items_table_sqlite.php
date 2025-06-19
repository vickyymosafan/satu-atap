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
        Schema::create('faq_items', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->enum('category', ['general', 'booking', 'payment', 'property', 'account', 'technical'])->default('general');
            $table->boolean('is_featured')->default(false); // For highlighting important FAQs
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->integer('view_count')->default(0); // Track popularity
            $table->timestamps();

            // Indexes for better performance
            $table->index(['is_active', 'sort_order']);
            $table->index(['category', 'is_active']);
            $table->index(['is_featured', 'is_active']);
            // Skip fulltext index for SQLite compatibility
            // $table->fullText(['question', 'answer']); // For search functionality
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_items');
    }
};
