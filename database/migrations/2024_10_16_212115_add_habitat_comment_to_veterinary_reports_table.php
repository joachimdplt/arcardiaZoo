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
        Schema::table('veterinary_reports', function (Blueprint $table) {
            $table->text('habitat_comment')->nullable()->after('details'); // Ajouter la colonne habitat_comment
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('veterinary_reports', function (Blueprint $table) {
            $table->dropColumn('habitat_comment'); // Supprimer la colonne en cas de rollback
        });
    }
};