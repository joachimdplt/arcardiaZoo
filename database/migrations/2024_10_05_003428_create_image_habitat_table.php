<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImageHabitatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_habitat', function (Blueprint $table) {
            $table->unsignedBigInteger('habitat_id'); // Clé étrangère vers habitats
            $table->unsignedBigInteger('image_id'); // Clé étrangère vers images

            $table->primary(['habitat_id', 'image_id']); // Clé primaire composée

            // Définir les relations
            $table->foreign('habitat_id')->references('id')->on('habitats')->onDelete('cascade');
            $table->foreign('image_id')->references('id')->on('images')->onDelete('cascade');

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
        Schema::dropIfExists('image_habitat');
    }
}
