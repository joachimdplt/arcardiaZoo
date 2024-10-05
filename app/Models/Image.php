<?php
namespace App\Models;namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['image_data'];

    // Une image peut être associée à plusieurs habitats
    public function habitats()
    {
        return $this->belongsToMany(Habitat::class, 'image_habitat', 'image_id', 'habitat_id');
    }
}