<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalFeeding extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id', 
        'user_id', 
        'feed_date', 
        'feed_time', 
        'feed_type', 
        'feed_quantity'
    ];

    // Relation avec l'animal
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    // Relation avec le rapport vétérinaire, sans redondance sur l’animal_id
    public function veterinaryReport()
    {
        return $this->belongsTo(VeterinaryReport::class);
    }


    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}