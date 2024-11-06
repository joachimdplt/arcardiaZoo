<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relation avec les rôles
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    // Relation avec les rapports vétérinaires
    public function veterinaryReports()
    {
        return $this->hasMany(VeterinaryReport::class);
    }

    // Relation avec les alimentations
    public function feedings()
    {
        return $this->hasMany(AnimalFeeding::class);
    }

    // Vérifie si l'utilisateur a un rôle spécifique
    public function hasRole($roleLabel)
    {
        return $this->roles->contains(function ($role) use ($roleLabel) {
            return strtolower($role->label) === strtolower($roleLabel);
        });
    }

    // Vérifie si l'utilisateur est admin
    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    // Vérifie si l'utilisateur est employé
    public function isEmployee()
    {
        return $this->hasRole('employee');
    }

    // Vérifie si l'utilisateur est vétérinaire
    public function isVeterinary()
    {
        return $this->hasRole('veterinary');
    }
}