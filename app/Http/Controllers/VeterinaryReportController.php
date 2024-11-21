<?php

namespace App\Http\Controllers;

use App\Models\VeterinaryReport;
use App\Models\User;
use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VeterinaryReportController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        if ($user === null) {
            abort(403, 'Vous n\'êtes pas autorisé à voir ce rapport vétérinaire.');
        }

        $animal_id = $request->get('animal_id');
        $date = $request->get('date');

        $query = VeterinaryReport::with(['animal.habitats', 'user']);

        if ($animal_id) {
            $query->where('animal_id', $animal_id);
        }

        if ($date) {
            $query->where('date', $date);
        }

        $reports = $query->get();
        $animals = Animal::all();
        $userRoles = auth()->user()->roles->pluck('label')->toArray(); // Récupérer les rôles de l'utilisateur connecté

        return Inertia::render('Admin/VeterinaryReports', [
            'reports' => $reports,
            'animals' => $animals,
            'userRoles' => $userRoles, // Passer les rôles à la vue
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        if ($user === null) {
            abort(403, 'Vous n\'êtes pas autorisé à créer ce rapport vétérinaire.');
        }

        $animals = Animal::all();
        $veterinarians = User::whereHas('roles', function ($query) {
            $query->where('label', 'Veterinary');
        })->get();

        return Inertia::render('Admin/VeterinaryReportCreate', [
            'animals' => $animals,
            'veterinarians' => $veterinarians,
            'statuses' => VeterinaryReport::getHealthStatuses(), // Passer les statuts à la vue
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'details' => 'required|string',
            'animal_id' => 'required|exists:animals,id',
            'habitat_comment' => 'nullable|string',
            'feed_type' => 'nullable|string',
            'feed_quantity' => 'nullable|integer',
            'status' => 'required|string|in:' . implode(',', VeterinaryReport::getHealthStatuses()), // Valider le statut
        ]);

        VeterinaryReport::create([
            'date' => $request->get('date'),
            'details' => $request->get('details'),
            'animal_id' => $request->get('animal_id'),
            'user_id' => $request->user()->id,
            'habitat_comment' => $request->get('habitat_comment'),
            'feed_type' => $request->get('feed_type'),
            'feed_quantity' => $request->get('feed_quantity'),
            'status' => $request->get('status'), // Ajouter le statut
        ]);

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport créé avec succès.');
    }

    public function edit($id)
    {
        $report = VeterinaryReport::findOrFail($id);
        $animals = Animal::all();
        $veterinarians = User::whereHas('roles', function ($query) {
            $query->where('label', 'Veterinary');
        })->get();

        return Inertia::render('Admin/VeterinaryReportUpdate', [
            'report' => $report,
            'animals' => $animals,
            'veterinarians' => $veterinarians,
            'statuses' => VeterinaryReport::getHealthStatuses(), // Passer les statuts à la vue
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'details' => 'required|string',
            'animal_id' => 'required|exists:animals,id',
            'feed_type' => 'nullable|string',
            'feed_quantity' => 'nullable|integer',
            'status' => 'required|string|in:' . implode(',', VeterinaryReport::getHealthStatuses()), // Valider le statut
        ]);

        $report = VeterinaryReport::findOrFail($id);
        $report->update($request->all());

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport mis à jour avec succès.');
    }

    public function show($id)
    {
        $report = VeterinaryReport::with('animal', 'user')->findOrFail($id);

        return Inertia::render('Admin/VeterinaryReportShow', [
            'report' => $report,
        ]);
    }
        public function destroy($id)
    {
        // Récupérer le rapport vétérinaire
        $report = VeterinaryReport::findOrFail($id);

        // Supprimer le rapport
        $report->delete();

        // Rediriger avec un message de succès
        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport vétérinaire supprimé avec succès.');
    }

    public function showReportsByAnimal($animalId)
    {
        // Trouver l'animal
        $animal = Animal::findOrFail($animalId);

        // Récupérer les rapports vétérinaires associés à cet animal
        $reports = VeterinaryReport::with('user') // Charger les informations du vétérinaire (user)
            ->where('animal_id', $animalId)
            ->get();

        // Passer les rapports et l'animal à la vue Inertia
        return Inertia::render('Admin/VeterinaryReportsByAnimal', [
            'animal' => $animal,
            'reports' => $reports,
        ]);
    }
}
