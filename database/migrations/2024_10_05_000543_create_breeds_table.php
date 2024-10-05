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
        Schema::create('breeds', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->string('label', 50); // label limité à 50 caractères
            $table->timestamps(); // timestamps Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breeds');
    }
};
