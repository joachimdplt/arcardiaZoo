<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VeterinaryReport extends Model
{
    use HasFactory;

    // Ajoutez 'feed_type' et 'feed_quantity' dans les champs fillables
    protected $fillable = [
        'date', 
        'details', 
        'animal_id', 
        'user_id', 
        'habitat_comment', 
        'feed_type', 
        'feed_quantity'
    ];

    // Un rapport vétérinaire est lié à un seul animal
    public function animal()
    {
        return $this->belongsTo(Animal::class, 'animal_id');
    }

    // Un rapport vétérinaire est rédigé par un utilisateur (vétérinaire)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}