<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Exécuter le RoleSeeder en premier pour s'assurer que les rôles sont disponibles
        $this->call(RoleSeeder::class);

        // Exécuter le AdminUserSeeder pour créer l'utilisateur administrateur original
        $this->call(AdminUserSeeder::class);

        // Exemple de création d'un utilisateur de test
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->call(ServicesTableSeeder::class);
    }
}