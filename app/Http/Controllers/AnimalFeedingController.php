<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalFeeding;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Restriction pour autoriser uniquement les employés à accéder à cette action
        if (!in_array('Employee', $userRoles)) {
            abort(403, 'Seuls les employés sont autorisés à nourrir les animaux.');
        }

        $animal = Animal::with(['veterinaryReports' => function ($query) {
            $query->latest()->first(); // Récupérer uniquement le dernier rapport
        }])->findOrFail($animalId);

        // Récupérer les suggestions du dernier rapport vétérinaire
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
            'feedOptions' => $feedOptions, // Passe les recommandations à AnimalShow
            'userRoles' => $userRoles,
        ]);
    }

    public function store(Request $request, $animalId)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Restriction pour autoriser uniquement les employés à nourrir les animaux
        if (!in_array('Employee', $userRoles)) {
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
            'user_id' => $user->id, // Associer l'utilisateur connecté
            'feed_date' => $request->feed_date,
            'feed_time' => $request->feed_time,
            'feed_type' => $request->feed_type,
            'feed_quantity' => $request->feed_quantity,
        ]);

        return back()->with('success', 'Alimentation enregistrée avec succès.');
    }
}