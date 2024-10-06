<?php

namespace App\Http\Controllers;

use App\Models\VeterinaryReport;
use Illuminate\Http\Request;

class VeterinaryReportController extends Controller
{
    // Afficher la liste de tous les rapports vétérinaires
    public function index()
    {
        $reports = VeterinaryReport::all();
        return response()->json($reports);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer un nouveau rapport vétérinaire
    public function store(Request $request)
    {
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

    // Afficher un rapport vétérinaire spécifique
    public function show($id)
    {
        $report = VeterinaryReport::findOrFail($id);
        return response()->json($report);
    }

    // Afficher le formulaire d'édition d'un rapport (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour un rapport vétérinaire spécifique
    public function update(Request $request, $id)
    {
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

    // Supprimer un rapport vétérinaire spécifique
    public function destroy($id)
    {
        $report = VeterinaryReport::findOrFail($id);
        $report->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}