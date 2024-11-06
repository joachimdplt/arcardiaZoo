<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultationHabitat extends Model
{
    protected $connection = 'mongodb'; // Connexion MongoDB
    protected $collection = 'consultations_habitat'; // Nom de la collection

    protected $fillable = ['habitat_id', 'click_count'];
}