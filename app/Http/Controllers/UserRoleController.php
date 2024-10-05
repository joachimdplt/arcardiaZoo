<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    // Afficher la liste des relations entre utilisateurs et rôles
    public function index()
    {
        $userRoles = UserRole::all();
        return response()->json($userRoles);
    }

    // Afficher le formulaire de création (si nécessaire)
    public function create()
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Enregistrer une nouvelle relation utilisateur-rôle
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        // Créer une nouvelle relation utilisateur-rôle
        $userRole = UserRole::create($request->all());
        return response()->json($userRole, 201); // Retourner la relation créée avec un code de statut 201
    }

    // Afficher une relation utilisateur-rôle spécifique
    public function show($id)
    {
        $userRole = UserRole::findOrFail($id);
        return response()->json($userRole);
    }

    // Afficher le formulaire d'édition d'une relation utilisateur-rôle (si nécessaire)
    public function edit($id)
    {
        // Vous pouvez retourner une vue si vous utilisez Blade ou un frontend.
    }

    // Mettre à jour une relation utilisateur-rôle spécifique
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ]);

        // Mettre à jour la relation utilisateur-rôle
        $userRole = UserRole::findOrFail($id);
        $userRole->update($request->all());
        return response()->json($userRole);
    }

    // Supprimer une relation utilisateur-rôle spécifique
    public function destroy($id)
    {
        $userRole = UserRole::findOrFail($id);
        $userRole->delete();

        return response()->json(null, 204); // Retourner une réponse vide avec un code de statut 204
    }
}