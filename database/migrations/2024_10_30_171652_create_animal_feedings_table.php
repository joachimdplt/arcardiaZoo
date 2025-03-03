<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnimalFeedingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animal_feedings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('animal_id'); // Lien avec l'animal
            $table->unsignedBigInteger('user_id'); // Lien avec l'utilisateur qui a nourri
            $table->date('feed_date'); // Date de l'alimentation
            $table->time('feed_time'); // Heure de l'alimentation
            $table->string('feed_type'); // Type de nourriture
            $table->integer('feed_quantity'); // Quantité de nourriture
            $table->timestamps();

            // Clés étrangères
            $table->foreign('animal_id')->references('id')->on('animals')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animal_feedings');
    }
}