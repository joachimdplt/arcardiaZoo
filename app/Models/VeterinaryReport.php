<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VeterinaryReport extends Model
{
    use HasFactory;

    // Champs fillables
    protected $fillable = [
        'date', 
        'details', 
        'animal_id', 
        'user_id', 
        'habitat_comment', 
        'feed_type', 
        'feed_quantity', 
        'status' // Ajouter ici
    ];

    // Définir les états de santé possibles
    const STATUS_HEALTHY = 'healthy';
    const STATUS_SICK = 'sick';
    const STATUS_CRITICAL = 'critical';

    /**
     * Récupérer les états de santé disponibles pour un rapport vétérinaire
     *
     * @return array
     */
    public static function getHealthStatuses()
    {
        return [
            self::STATUS_HEALTHY,
            self::STATUS_SICK,
            self::STATUS_CRITICAL,
        ];
    }

    // Relations avec les autres modèles
    public function animal()
    {
        return $this->belongsTo(Animal::class, 'animal_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}