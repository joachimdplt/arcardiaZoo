<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VeterinaryReport extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'details', 'animal_id', 'user_id'];

    // Un rapport vétérinaire est lié à un animal
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    // Un rapport vétérinaire est rédigé par un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}