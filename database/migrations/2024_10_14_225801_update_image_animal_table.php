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
        // Supprimer la colonne `id` si elle existe
        Schema::table('image_animal', function (Blueprint $table) {
            $table->dropColumn('id'); // Assurez-vous que cette colonne existe avant de la supprimer
        });

        // Ajouter une clé primaire composée
        Schema::table('image_animal', function (Blueprint $table) {
            $table->primary(['animal_id', 'image_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Si nécessaire, ajouter la colonne id et supprimer la clé primaire composée
        Schema::table('image_animal', function (Blueprint $table) {
            $table->id(); // Recréer la colonne `id` si besoin
            $table->dropPrimary(['animal_id', 'image_id']);
        });
    }
};