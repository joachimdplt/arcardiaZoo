<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'breed_id'];



    // Relation avec les habitats (plusieurs habitats pour un animal)
    public function habitats()
    {
        return $this->belongsToMany(Habitat::class, 'animal_habitats', 'animal_id', 'habitat_id');
    }

    // Relation avec la race
    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    // Relation avec les images (plusieurs images pour un animal)
    public function images()
    {
        return $this->belongsToMany(Image::class, 'image_animal', 'animal_id', 'image_id');
    }

    // Animal.php

    public function veterinaryReports()
    {
        return $this->hasMany(VeterinaryReport::class, 'animal_id');
    }


    // Relation avec les consultations pour chaque animal
    public function consultations()
    {
        return $this->hasMany(ConsultationAnimal::class, 'animal_id', 'id');
    }

    public function feedings()
    {
        return $this->hasMany(AnimalFeeding::class);
    }

}

