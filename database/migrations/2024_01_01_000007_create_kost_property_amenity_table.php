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
        Schema::create('kost_property_amenity', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('kost_properties')->onDelete('cascade');
            $table->foreignId('amenity_id')->constrained('kost_amenities')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['property_id', 'amenity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kost_property_amenity');
    }
};
