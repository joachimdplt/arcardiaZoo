<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    // Afficher tous les rôles (accessible à tous)
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    // Enregistrer un nouveau rôle (admin uniquement)
    public function store(Request $request)
    {
        // Vérification du rôle admin
        if (!$request->user() || (!$request->user()->isAdmin())) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Créer un nouveau rôle
        $role = Role::create($request->all());
        return response()->json($role, 201);
    }

    // Afficher un rôle spécifique (accessible à tous)
    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    // Mettre à jour un rôle spécifique (admin uniquement)
    public function update(Request $request, $id)
    {
        // Vérification du rôle admin
        if (!$request->user() || (!$request->user()->isAdmin())) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Mettre à jour le rôle
        $role = Role::findOrFail($id);
        $role->update($request->all());
        return response()->json($role);
    }

    // Supprimer un rôle spécifique (admin uniquement)
    public function destroy(Request $request, $id)
    {
        // Vérification du rôle admin
        if (!$request->user() || (!$request->user()->isAdmin())) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Supprimer le rôle
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(null, 204);
    }
}