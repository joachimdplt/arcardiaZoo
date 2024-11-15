<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserControllerApi extends Controller
{
    // Afficher la liste des utilisateurs
    public function index()
    {
        $users = User::with('roles')->get(); // Récupérer les utilisateurs avec leurs rôles
        // return response()->json($users, 200);
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'roles' => 'required|array', 
        ]);
    
        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        // Assigner le rôle unique
        $user->roles()->sync($request->roles);
    
        return redirect()->route('users.index')->with('success', 'Utilisateur créé avec succès');
    }

    // Afficher les détails d'un utilisateur spécifique
    public function show($id)
    {
        $user = User::with('roles')->findOrFail($id); // Récupérer l'utilisateur avec ses rôles
        // return response()->json($user, 200);
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    // Mettre à jour un utilisateur
    public function update(Request $request, $id)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6|confirmed', // Permettre au champ 'password' d'être nul
            'roles' => 'required|array',
        ]);
    
        // Trouver l'utilisateur
        $user = User::findOrFail($id);
    
        // Mettre à jour les informations utilisateur
        $user->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password, // Mise à jour du mot de passe si envoyé
        ]);
    
        // Mettre à jour les rôles
        $user->roles()->sync($request->roles);
    
        // return response()->json(['message' => 'Utilisateur mis à jour avec succès', 'user' => $user], 200);
        return redirect()->route('users.index')->with('success', 'Utilisateur mis à jour avec succès');
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        // return response()->json(['message' => 'Utilisateur supprimé avec succès'], 204);
        return redirect()->route('users.index')->with('success', 'Utilisateur supprimé avec succès');
    }
}