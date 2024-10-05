<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    use HasFactory;

    protected $fillable = ['label'];

    // Une race peut être associée à plusieurs animaux
    public function animals()
    {
        return $this->hasMany(Animal::class);
    }
}