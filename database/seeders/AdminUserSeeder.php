<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Créer le compte administrateur s'il n'existe pas déjà
        $admin = User::firstOrCreate(
            ['email' => 'jose@arcadia.com'],
            [
                'name' => 'Jose',
                'last_name' => 'Arcadia',
                'password' => Hash::make('arcadiazoo'),
            ]
        );

        // Récupérer le rôle d'administrateur ou le créer s'il n'existe pas
        $adminRole = Role::firstOrCreate(['label' => 'admin']);

        // Associer le rôle d'administrateur à l'utilisateur
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);
    }
}