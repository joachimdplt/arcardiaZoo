<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalHabitat extends Model
{
    use HasFactory;

    protected $table = 'animal_habitat';

    // Pas de timestamps nécessaires dans une table pivot
    public $timestamps = false;
}