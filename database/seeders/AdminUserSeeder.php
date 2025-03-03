<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Récupérer le rôle Admin
        $adminRole = Role::where('label', 'Admin')->first();

        if (!$adminRole) {
            throw new \Exception('Le rôle "Admin" doit être créé avant d\'exécuter ce seeder.');
        }

        // Vérifier si l'utilisateur existe déjà, sinon le créer
        $admin = User::firstOrCreate(
            ['email' => 'jose@arcadia.com'],
            [
                'name' => 'Jose',
                'last_name' => 'Arcadia',
                'password' => Hash::make('arcadiazoo'),
            ]
        );

        // Associer le rôle Admin à Jose
        $admin->role_id = $adminRole->id;
        $admin->save();
    }
}