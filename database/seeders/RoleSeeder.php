<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insertion des rôles
        Role::create(['label' => 'Admin']);
        Role::create(['label' => 'Veterinaire']);
        Role::create(['label' => 'Employee']);
    }
}