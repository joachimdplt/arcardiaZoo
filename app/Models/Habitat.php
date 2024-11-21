<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ConsultationHabitat; // Assurez-vous d'importer le modèle MongoDB

class Habitat extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', ];

    // Un habitat peut avoir plusieurs animaux
    public function animals()
    {
        return $this->belongsToMany(Animal::class, 'animal_habitats', 'habitat_id', 'animal_id');
    }

    // Un habitat peut avoir plusieurs images
    public function images()
    {
        return $this->belongsToMany(Image::class, 'image_habitat', 'habitat_id', 'image_id');
    }

    // Méthode pour récupérer les consultations depuis MongoDB
    public function consultations()
    {
        return ConsultationHabitat::where('habitat_id', $this->id)->get();
    }
}