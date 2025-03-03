<?php 

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
    
        if ($user) {
            $user = User::where('id', $user->id)->with('role')->first(); // ✅ Forcer le chargement du rôle
        }
    
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user
            ],
        ]);
    }
}