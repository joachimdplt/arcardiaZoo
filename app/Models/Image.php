<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status', 'breed_id', 'image_id'];

    // Un animal appartient à une race
    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    // Un animal peut être dans plusieurs habitats
    public function habitats()
    {
        return $this->belongsToMany(Habitat::class, 'animal_habitat', 'animal_id', 'habitat_id');
    }

    // Un animal peut avoir plusieurs rapports vétérinaires
    public function veterinaryReports()
    {
        return $this->hasMany(VeterinaryReport::class);
    }
}