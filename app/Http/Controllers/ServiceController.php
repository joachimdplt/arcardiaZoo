<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Afficher la liste de tous les services
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    // Afficher le formulaire de création (si nécessaire, pour les applications frontend)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer un nouveau service
    public function store(Request $request)
    {
        // Validation des données si nécessaire
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
        ]);

        // Créer le service dans la base de données
        $service = Service::create($request->all());
        return response()->json($service, 201); // Retourner le service créé avec un code de statut 201
    }

    // Afficher un service spécifique
    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    // Afficher le formulaire d'édition d'un service (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour un service spécifique
    public function update(Request $request, $id)
    {
        // Validation des données si nécessaire
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
        ]);

        // Mettre à jour le service
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return response()->json($service);
    }

    // Supprimer un service spécifique
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}