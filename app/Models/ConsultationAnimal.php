<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultationAnimal extends Model
{
    protected $connection = 'mongodb'; // Utilisation de la connexion MongoDB
    protected $collection = 'consultations_animal'; // Collection pour stocker les consultations d'animaux

    protected $fillable = ['animal_id', 'click_count']; // Colonnes autorisées
}