<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('user_roles', function (Blueprint $table) {
            $table->unique('user_id', 'unique_user_role'); // Ajoute une contrainte UNIQUE sur user_id
        });
    }

    public function down()
    {
        Schema::table('user_roles', function (Blueprint $table) {
            $table->dropUnique('unique_user_role'); // Supprime la contrainte en cas de rollback
        });
    }
};
