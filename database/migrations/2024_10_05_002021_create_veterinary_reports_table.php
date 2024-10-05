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
        Schema::dropIfExists('veterinary_reports');
    }
}
