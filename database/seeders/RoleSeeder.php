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
        // Éviter les doublons avec `firstOrCreate()`
        Role::firstOrCreate(['label' => 'Admin']);
        Role::firstOrCreate(['label' => 'Veterinary']);
        Role::firstOrCreate(['label' => 'Employee']);
    }
}