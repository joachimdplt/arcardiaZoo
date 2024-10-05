<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->string('username', 50); // username limité à 50 caractères
            $table->text('comment'); // commentaire en texte
            $table->boolean('is_visible'); // champ booléen pour la visibilité
            $table->timestamps(); // timestamps Laravel
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}
