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
        $userRoles = $user->roles->pluck('label')->toArray();

        // Interdire l'accès si l'utilisateur est Admin ou Employee
        if (in_array('Admin', $userRoles) || in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à créer un rapport vétérinaire.');
        }

        $animals = Animal::all();
        $veterinarians = User::whereHas('roles', function ($query) {
            $query->where('label', 'veterinary');
        })->get();

        return Inertia::render('Admin/VeterinaryReportCreate', [
            'animals' => $animals,
            'veterinarians' => $veterinarians,
            'userRoles' => $userRoles,
            
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
        ]);

        VeterinaryReport::create([
            'date' => $request->get('date'),
            'details' => $request->get('details'),
            'animal_id' => $request->get('animal_id'),
            'user_id' => $request->user()->id,
            'habitat_comment' => $request->get('habitat_comment'),
            'feed_type' => $request->get('feed_type'),
            'feed_quantity' => $request->get('feed_quantity'),
        ]);

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport créé avec succès.');
    }



    public function edit($id)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Interdire l'accès si l'utilisateur est Admin ou Employee
        if (in_array('Admin', $userRoles) || in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à modifier ce rapport vétérinaire.');
        }

        $report = VeterinaryReport::findOrFail($id);
        $animals = Animal::all();
        $veterinarians = User::whereHas('roles', function ($query) {
            $query->where('label', 'veterinary');
        })->get();
    
        return Inertia::render('Admin/VeterinaryReportUpdate', [
            'report' => $report,
            'animals' => $animals,
            'veterinarians' => $veterinarians,

        ]);
    }

    public function show($id)
    {
        $report = VeterinaryReport::with('animal', 'user')->findOrFail($id);

        return Inertia::render('Admin/VeterinaryReportShow', [
            'report' => $report,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Interdire l'accès si l'utilisateur est Admin ou Employee
        if (in_array('Admin', $userRoles) || in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à modifier ce rapport vétérinaire.');
        }

        $request->validate([
            'date' => 'required|date',
            'details' => 'required',
            'animal_id' => 'required|exists:animals,id',
            'user_id' => 'required|exists:users,id',
            'feed_type' => 'nullable|string',
            'feed_quantity' => 'nullable|integer',
        ]);

        $report = VeterinaryReport::findOrFail($id);
        $report->update($request->all());

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport mis à jour avec succès.');
    }

    public function showReportsByAnimal($animalId)
    {
        $animal = Animal::findOrFail($animalId);
        $reports = VeterinaryReport::with('user')
            ->where('animal_id', $animalId)
            ->get();

        return Inertia::render('Admin/VeterinaryReportsByAnimal', [
            'animal' => $animal,
            'reports' => $reports,
        ]);
    }

    public function destroy($id)
    {
        $user = auth()->user();
        $userRoles = $user->roles->pluck('label')->toArray();

        // Interdire l'accès si l'utilisateur est Admin ou Employee
        if (in_array('Admin', $userRoles) || in_array('Employee', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer ce rapport vétérinaire.');
        }

        $report = VeterinaryReport::findOrFail($id);
        $report->delete();

        return redirect()->route('admin.veterinary-reports.index')->with('success', 'Rapport supprimé avec succès.');
    }
}