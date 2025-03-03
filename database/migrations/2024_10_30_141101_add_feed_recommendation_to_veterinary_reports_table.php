<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFeedRecommendationToVeterinaryReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('veterinary_reports', function (Blueprint $table) {
            $table->string('feed_type')->nullable(); // Type d'alimentation recommandé
            $table->integer('feed_quantity')->nullable(); // Quantité recommandée
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('veterinary_reports', function (Blueprint $table) {
            $table->dropColumn(['feed_type', 'feed_quantity']);
        });
    }
}