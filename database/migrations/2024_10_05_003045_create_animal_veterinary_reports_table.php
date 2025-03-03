<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalVeterinaryReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal_veterinary_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id'); // Clé étrangère vers users
            $table->unsignedBigInteger('veterinary_report_id'); // Clé étrangère vers veterinary_reports
            $table->unsignedBigInteger('animal_id'); // Clé étrangère vers animals

            $table->primary(['user_id', 'veterinary_report_id']); // Clé primaire composée

            // Définir les relations
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('veterinary_report_id')->references('id')->on('veterinary_reports')->onDelete('cascade');
            $table->foreign('animal_id')->references('id')->on('animals')->onDelete('cascade');

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
        Schema::dropIfExists('animal_veterinary_reports');
    }
}
