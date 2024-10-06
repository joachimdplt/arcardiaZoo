<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Utilisé pour vérifier l'utilisateur connecté

class ServiceController extends Controller
{
    // Afficher la liste de tous les services
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    // Enregistrer un nouveau service (admin ou employé uniquement)
    public function store(Request $request)
    {
        // Vérification des rôles (admin ou employé)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
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

    // Mettre à jour un service spécifique (admin ou employé uniquement)
    public function update(Request $request, $id)
    {
        // Vérification des rôles (admin ou employé)
        if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isEmployee())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
        ]);

        // Mettre à jour le service
        $service = Service::findOrFail($id);
        $service->update($request->all());
        return response()->json($service);
    }

    // Supprimer un service spécifique (admin uniquement)
    public function destroy(Request $request, $id,)
    {
        // Vérification du rôle (admin uniquement)
        if (!$request->user() || (!$request->user()->isAdmin())) {
            return response()->json(['error' => 'Unauthorized'], 403); // Refuser l'accès
        }

        // Supprimer le service
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}