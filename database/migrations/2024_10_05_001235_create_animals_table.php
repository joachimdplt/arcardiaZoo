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
        Schema::create('animals', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->string('name', 50); // nom de l'animal limité à 50 caractères
            $table->string('status', 50); // statut de l'animal limité à 50 caractères
            $table->foreignId('breed_id')->constrained('breeds')->onDelete('cascade'); // Clé étrangère vers breeds
            $table->foreignId('image_id')->constrained('images')->onDelete('cascade'); // Clé étrangère vers images
            $table->timestamps(); // timestamps Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
