<?php

namespace App\Http\Controllers;

use App\Models\VeterinaryReport;
use Illuminate\Http\Request;

class VeterinaryReportController extends Controller
{
    // Afficher la liste de tous les rapports vétérinaires (accessible aux admins et vétérinaires)
    public function index(Request $request)
    {
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isVeterinary())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        $reports = VeterinaryReport::all();
        return response()->json($reports);
    }

    // Enregistrer un nouveau rapport vétérinaire (accessible uniquement aux vétérinaires et administrateurs)
    public function store(Request $request)
    {
        // Vérification des rôles
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isVeterinary())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'date' => 'required|date',
            'details' => 'required',
            'animal_id' => 'required|exists:animals,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Créer un nouveau rapport vétérinaire
        $report = VeterinaryReport::create($request->all());
        return response()->json($report, 201); // Retourner le rapport créé avec un code de statut 201
    }

    // Afficher un rapport vétérinaire spécifique (accessible uniquement aux vétérinaires et administrateurs)
    public function show(Request $request, $id)
    {
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isVeterinary())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        $report = VeterinaryReport::findOrFail($id);
        return response()->json($report);
    }

    // Mettre à jour un rapport vétérinaire spécifique (accessible uniquement aux vétérinaires et administrateurs)
    public function update(Request $request, $id)
    {
        // Vérification des rôles
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isVeterinary())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'date' => 'required|date',
            'details' => 'required',
            'animal_id' => 'required|exists:animals,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Mettre à jour le rapport
        $report = VeterinaryReport::findOrFail($id);
        $report->update($request->all());
        return response()->json($report);
    }

    // Supprimer un rapport vétérinaire spécifique (accessible uniquement aux administrateurs)
    public function destroy(Request $request, $id)
    {
        // Vérification des rôles (seuls les administrateurs peuvent supprimer un rapport)
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Supprimer le rapport vétérinaire
        $report = VeterinaryReport::findOrFail($id);
        $report->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}