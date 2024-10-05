<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    // Afficher tous les rôles
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    // Afficher le formulaire de création (si vous utilisez un front-end)
    public function create()
    {
        // Retourner une vue si nécessaire
    }

    // Enregistrer un nouveau rôle
    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return response()->json($role, 201);
    }

    // Afficher un rôle spécifique
    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    // Afficher le formulaire d'édition pour un rôle (si vous utilisez un front-end)
    public function edit($id)
    {
        // Retourner une vue si nécessaire
    }

    // Mettre à jour un rôle spécifique
    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->all());
        return response()->json($role);
    }

    // Supprimer un rôle spécifique
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(null, 204);
    }
}