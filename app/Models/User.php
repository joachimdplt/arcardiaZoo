<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relation: Un utilisateur peut avoir plusieurs rôles.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    /**
     * Relation: Un utilisateur peut rédiger plusieurs rapports vétérinaires.
     */
    public function veterinaryReports()
    {
        return $this->hasMany(VeterinaryReport::class);
    }

    public function isAdmin()
    {
        // Vérifie si l'utilisateur possède un rôle avec le label "admin"
        return $this->roles->contains('label', 'admin');
    }

    public function isEmployee()
    {
        // Vérifie si l'utilisateur possède un rôle avec le label "admin"
        return $this->roles->contains('label', 'employee');
    }
    public function isVeterinary()
    {
    // Vérifie si l'utilisateur possède un rôle avec le label "admin"
        return $this->roles->contains('label', 'veterinary');
    }

}