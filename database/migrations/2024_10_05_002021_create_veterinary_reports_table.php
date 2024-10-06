<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVeterinaryReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('veterinary_reports', function (Blueprint $table) {
            $table->id(); // ID auto-incrémenté
            $table->date('date'); // champ pour la date
            $table->text('details'); // détails du rapport vétérinaire en texte
            $table->unsignedBigInteger('user_id'); // clé étrangère vers users
            $table->unsignedBigInteger('animal_id'); // clé étrangère vers animals
            $table->timestamps(); // timestamps Laravel

            // Définir les relations
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('animal_id')->references('id')->on('animals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('veterinary_reports');
    }
}