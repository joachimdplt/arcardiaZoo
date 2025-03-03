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
        Schema::create('habitats', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->string('name', 50); // nom de l'habitat limité à 50 caractères
            $table->text('description'); // description de l'habitat sous forme de texte
            $table->text('comment'); // champ pour les commentaires
            $table->timestamps(); // timestamps Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habitats');
    }
};
