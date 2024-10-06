<?php

namespace Database\Factories;

use App\Models\VeterinaryReport;
use App\Models\User;
use App\Models\Animal;
use Illuminate\Database\Eloquent\Factories\Factory;

class VeterinaryReportFactory extends Factory
{
    protected $model = VeterinaryReport::class;

    public function definition()
    {
        return [
            'date' => $this->faker->date(), // Génère une date aléatoire
            'details' => $this->faker->paragraph(), // Génère un paragraphe aléatoire pour les détails
            'user_id' => User::factory(), // Associe un utilisateur via la factory User (sans create)
            'animal_id' => Animal::factory(), // Associe un animal via la factory Animal (sans create)
        ];
    }
}