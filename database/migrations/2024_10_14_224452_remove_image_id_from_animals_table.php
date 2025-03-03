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
        // Supprimer la colonne image_id de la table animals
        Schema::table('animals', function (Blueprint $table) {
            $table->dropForeign(['image_id']); // Supprimer la clé étrangère d'abord
            $table->dropColumn('image_id'); // Ensuite, supprimer la colonne elle-même
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Ajouter de nouveau la colonne image_id (en cas de rollback)
        Schema::table('animals', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained('images')->onDelete('cascade');
        });
    }
};