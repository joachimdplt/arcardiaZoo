<?php

namespace App\Models;namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitat extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'comment'];

    // Un habitat peut avoir plusieurs animaux
    public function animals()
    {
        return $this->belongsToMany(Animal::class, 'animal_habitat', 'habitat_id', 'animal_id');
    }

    // Un habitat peut avoir plusieurs images
    public function images()
    {
        return $this->belongsToMany(Image::class, 'image_habitat', 'habitat_id', 'image_id');
    }
}