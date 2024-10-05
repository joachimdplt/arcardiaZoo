<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageHabitat extends Model
{
    use HasFactory;

    protected $table = 'image_habitat';

    // Pas de timestamps nécessaires dans une table pivot
    public $timestamps = false;
}