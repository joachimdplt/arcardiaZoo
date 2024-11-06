<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImageServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_services', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id'); // Clé étrangère vers services
            $table->unsignedBigInteger('image_id');   // Clé étrangère vers images

            $table->primary(['service_id', 'image_id']); // Clé primaire composée

            // Définir les relations
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
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
        Schema::dropIfExists('image_services');
    }
}