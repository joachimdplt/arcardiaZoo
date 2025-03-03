<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalFeeding;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AnimalFeedingController extends Controller
{
    public function showFeedings($animalId)
    {
        $animal = Animal::with(['feedings.user'])->findOrFail($animalId);

        return Inertia::render('Admin/AnimalFeedingReport', [
            'animal' => $animal,
            'feedings' => $animal->feedings,
        ]);
    }
    

    public function create($animalId)
    {
        $user = Auth::user();
        
        // Vérification du rôle Employee
        if (!$user->role || $user->role->label !== 'Employee') {
            abort(403, 'Seuls les employés sont autorisés à nourrir les animaux.');
        }

        $animal = Animal::with(['veterinaryReports' => function ($query) {
            $query->latest()->first();
        }])->findOrFail($animalId);

        $lastVeterinaryReport = $animal->veterinaryReports->first();
        $feedOptions = [];

        if ($lastVeterinaryReport) {
            $feedOptions[] = [
                'type' => $lastVeterinaryReport->feed_type,
                'quantity' => $lastVeterinaryReport->feed_quantity,
            ];
        }

        return Inertia::render('Admin/AnimalShow', [
            'animal' => $animal,
            'feedOptions' => $feedOptions,
            'userRole' => $user->role->label
        ]);
    }

    public function store(Request $request, $animalId)
    {
        $user = Auth::user();

        // Vérification du rôle Employee
        if (!$user->role || $user->role->label !== 'Employee') {
            return redirect()->back()->with('error', 'Seuls les employés sont autorisés à nourrir les animaux.');
        }

        $request->validate([
            'feed_date' => 'required|date',
            'feed_time' => 'required',
            'feed_type' => 'required|string',
            'feed_quantity' => 'required|integer',
        ]);

        AnimalFeeding::create([
            'animal_id' => $animalId,
            'user_id' => $user->id,
            'feed_date' => $request->feed_date,
            'feed_time' => $request->feed_time,
            'feed_type' => $request->feed_type,
            'feed_quantity' => $request->feed_quantity,
        ]);

        return back()->with('success', 'Alimentation enregistrée avec succès.');
    }
}