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
        Schema::create('kost_properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('price_monthly');
            $table->integer('price_daily')->nullable();
            $table->enum('property_type', ['putra', 'putri', 'campur']);
            $table->enum('room_type', ['single', 'shared']);
            $table->integer('available_rooms');
            $table->integer('total_rooms');
            $table->foreignId('location_id')->constrained('kost_locations')->onDelete('cascade');
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->string('owner_name');
            $table->string('owner_phone');
            $table->string('owner_avatar')->nullable();
            $table->integer('owner_response_rate')->default(0);
            $table->string('owner_response_time')->default('< 24 jam');
            $table->json('rules')->nullable();
            $table->json('facilities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kost_properties');
    }
};
