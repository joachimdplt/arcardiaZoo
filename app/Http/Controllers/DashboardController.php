<?php

// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('roles'); 
        
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    }
}