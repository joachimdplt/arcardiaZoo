<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalHabitatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal_habitats', function (Blueprint $table) {
            $table->unsignedBigInteger('animal_id'); // Clé étrangère vers animals
            $table->unsignedBigInteger('habitat_id'); // Clé étrangère vers habitats

            $table->primary(['animal_id', 'habitat_id']); // Clé primaire composée

            // Définir les relations
            $table->foreign('animal_id')->references('id')->on('animals')->onDelete('cascade');
            $table->foreign('habitat_id')->references('id')->on('habitats')->onDelete('cascade');

            $table->timestamps(); // Timestamps par défaut
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animal_habitats');
    }
}
