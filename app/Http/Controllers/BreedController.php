<?php
namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreedController extends Controller
{
    // Afficher la liste des races
    public function index()
    {
        $user = auth()->user();
        if ($user===null) {
        abort(403, 'Vous n\'êtes pas autorisé à voir ce rapport vétérinaire.');
        }   
        $breeds = Breed::all(); // Récupérer toutes les races
        return Inertia::render('Admin/Breeds', [
            'breeds' => $breeds,
        ]);
    }

    // Afficher le formulaire de création d'une nouvelle race
    public function create()
    {
        $user = auth()->user();
        if ($user===null) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
        $userRoles = $user->roles->pluck('label')->toArray();
        if (in_array('Employee', $userRoles) || in_array('Veterinary', $userRoles )) {
            abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
        }

        }   
        return Inertia::render('Admin/BreedCreate');
    }

    public function store(Request $request)
{
    $user = auth()->user();
    if (!$user) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
    }

    $userRoles = $user->roles->pluck('label')->toArray();
    if (in_array('Employee', $userRoles) || in_array('Veterinary', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à ajouter de race.');
    }

    // Validation et création de la race
    $request->validate([
        'label' => 'required|string|max:255',
    ]);

    Breed::create([
        'label' => $request->input('label'),
    ]);

    // Redirection vers la page d'index des races avec un message de succès
    return redirect()->route('admin.breeds')
                     ->with('success', 'Race créée avec succès');
}

// Supprimer une race
public function destroy($id)
{
    $user = auth()->user();
    if ($user === null) {
        abort(403, 'Vous n\'êtes pas autorisé à supprimer cette race.');
    }

    $userRoles = $user->roles->pluck('label')->toArray();

    // Autoriser l'accès si l'utilisateur est Admin, interdire si c'est un Employee ou Veterinary
    if (in_array('Employee', $userRoles) || in_array('Veterinary', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à supprimer cette race.');
    }

    $breed = Breed::findOrFail($id);
    $breed->delete();

    return redirect()->route('admin.breeds')->with('success', 'Race supprimée avec succès.');
}
}