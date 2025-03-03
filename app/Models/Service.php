<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'start_time', 'end_time'];


     // Un habitat peut avoir plusieurs images
     public function images()
     {
         return $this->belongsToMany(Image::class, 'image_services', 'service_id', 'image_id');
     }
}