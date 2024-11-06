<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Fonction pour vérifier si l'utilisateur a le rôle d'administrateur
    private function isAdmin()
    {
        $user = Auth::user();
        return $user && $user->roles->contains('label', 'Admin');
    }

    public function dashboard()
    {
        $user = Auth::user();

        if ($user) {
            $user->load('roles');
        }

        return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    // Afficher la liste des utilisateurs
    public function users()
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $users = User::with('roles')->get();
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    // Afficher un utilisateur spécifique
    public function showUser($id)
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $user = User::with('roles')->findOrFail($id);
        return Inertia::render('Admin/UserShow', [
            'user' => $user,
        ]);
    }

    // Créer un nouvel utilisateur (afficher le formulaire)
    public function createUser()
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $roles = Role::all();
        return Inertia::render('Admin/UserCreate', [
            'roles' => $roles,
        ]);
    }

    // Enregistrer un nouvel utilisateur
    public function storeUser(Request $request)
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'roles' => 'required|array',
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Associer les rôles
        $user->roles()->sync($request->roles);

        return redirect()->route('admin.users')->with('success', 'Utilisateur créé avec succès.');
    }

    // Afficher le formulaire d'édition d'un utilisateur
    public function editUser($id)
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $user = User::findOrFail($id);
        $roles = Role::all();
        return Inertia::render('Admin/UpdateUsers', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    // Mettre à jour un utilisateur
    public function updateUser(Request $request, $id)
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        // Validation des données
        $request->validate([
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|min:6|confirmed',
            'roles' => 'required|array',
        ]);

        // Récupérer l'utilisateur
        $user = User::findOrFail($id);

        // Mettre à jour les données
        $user->update([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        // Mettre à jour les rôles
        $user->roles()->sync($request->roles);

        return redirect()->route('admin.users')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    // Supprimer un utilisateur
    public function destroyUser($id)
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'Utilisateur supprimé avec succès.');
    }

    public function contactMessages()
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $contacts = ContactMessage::all();
        return Inertia::render('Admin/Contact', ['contacts' => $contacts]);
    }

    public function showContacts()
    {
        if (!$this->isAdmin()) {
            abort(403, 'Accès refusé');
        }

        $messages = ContactMessage::all();

        return Inertia::render('Admin/Contact', [
            'messages' => $messages
        ]);
    }
}



