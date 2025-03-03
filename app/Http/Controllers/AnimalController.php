<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Breed;
use App\Models\Habitat;
use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

use MongoDB\Client;

class AnimalController extends Controller
{
    protected $mongoClient;
    protected $collection;

    public function __construct()
    {
        $host = env('DB_HOST_MONGODB', '127.0.0.1');
        $port = env('DB_PORT_MONGODB', '27017');
        $database = env('DB_DATABASE_MONGODB', 'arcadia_zoo_mongo');
        $uri = "mongodb://$host:$port";

        $this->mongoClient = new Client($uri);
        $this->collection = $this->mongoClient->selectCollection($database, 'consultations_animal');
    }

    /**
     * Affiche la liste des animaux
     */
    public function animals()
    {
        if (!Auth::check()) {
            abort(403, 'Vous n\'êtes pas autorisé à voir cette page.');
        }

        $animals = Animal::with('breed', 'images', 'habitats')->get();
        $userRoles = Auth::user()->role->label ?? null;

        return Inertia::render('Admin/Animals', [
            'animals' => $animals,
            'userRoles' => $userRoles,
        ]);
    }

    /**
     * Enregistre un clic sur un animal pour les statistiques MongoDB
     */
    public function recordAnimalClick($id)
    {
        try {
            $this->collection->updateOne(
                ['animal_id' => $id],
                ['$inc' => ['click_count' => 1]],
                ['upsert' => true]
            );

            $animal = Animal::with('images', 'habitats', 'breed')->findOrFail($id);

            return Inertia::render('Client/AnimalClientShow', [
                'animal' => $animal
            ]);
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'enregistrement du clic pour l'animal : " . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de l\'enregistrement du clic'], 500);
        }
    }

    /**
     * Affiche les statistiques des clics d'animaux
     */
    public function showAnimalStats()
    {
        $animalStats = iterator_to_array($this->collection->find());
        return Inertia::render('Admin/Stats', [
            'animalStats' => $animalStats
        ]);
    }

    /**
     * Affiche le formulaire de création d'un animal
     */
    public function create()
    {
        if (!Auth::check() || Auth::user()->role->label !== 'Admin') {
            abort(403, 'Vous n\'êtes pas autorisé à créer un animal.');
        }

        $breeds = Breed::all();
        $habitats = Habitat::all();

        return Inertia::render('Admin/AnimalCreate', [
            'breeds' => $breeds,
            'habitats' => $habitats,
        ]);
    }

    /**
     * Affiche un animal spécifique avec ses détails
     */
    public function show($id)
    {
        $animal = Animal::with('breed', 'images', 'habitats', 'veterinaryReports')->findOrFail($id);
        $lastVeterinaryReport = $animal->veterinaryReports->last();
        $user = Auth::user();

        return Inertia::render('Admin/AnimalShow', [
            'animal' => $animal,
            'lastVeterinaryReport' => $lastVeterinaryReport,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'role' => $user->role
                ]
            ]
        ]);
    }

    /**
     * Affiche le formulaire de modification d'un animal
     */
    public function edit($id)
    {
        if (!Auth::check() || Auth::user()->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        $animal = Animal::with('images', 'habitats')->findOrFail($id);
        $habitats = Habitat::all();

        return Inertia::render('Admin/AnimalUpdate', [
            'animal' => $animal,
            'habitats' => $habitats,
        ]);
    }

    /**
     * Enregistre un nouvel animal
     */
    public function store(Request $request)
    {
        if (!Auth::check() || Auth::user()->role->label !== 'Admin') {
            abort(403, 'Seuls les administrateurs peuvent créer un animal.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'habitat_id' => 'required|array',
            'habitat_id.*' => 'exists:habitats,id',
            'breed_id' => 'required|exists:breeds,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $animal = Animal::create($request->only('name', 'breed_id'));
        $animal->habitats()->attach($request->input('habitat_id'));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('animal_images', 'public');
                $imageModel = Image::create([
                    'image_data' => $imagePath,
                    'name' => $image->getClientOriginalName(),
                ]);
                $animal->images()->attach($imageModel->id);
            }
        }

        return redirect()->route('admin.animals')->with('success', 'Animal créé avec succès.');
    }

    /**
     * Met à jour un animal existant
     */
    public function update(Request $request, $id)
    {
        if (!Auth::check() || Auth::user()->role->label !== 'Admin') {
            abort(403, 'Vous n\'êtes pas autorisé à modifier cet animal.');
        }

        $request->validate([
            'name' => 'nullable|max:255',
            'breed_id' => 'nullable|exists:breeds,id',
            'habitat_id' => 'required|array',
            'habitat_id.*' => 'exists:habitats,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $animal = Animal::findOrFail($id);
        $animal->update($request->only('name', 'breed_id'));
        $animal->habitats()->sync($request->input('habitat_id'));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('animal_images', 'public');
                $imageModel = Image::create([
                    'image_data' => $imagePath,
                    'name' => $image->getClientOriginalName(),
                ]);
                $animal->images()->attach($imageModel->id);
            }
        }

        return redirect()->route('admin.animals')->with('success', 'Animal mis à jour avec succès.');
    }

    /**
     * Supprime un animal
     */
    public function destroy($id)
    {
        if (!Auth::check() || Auth::user()->role->label !== 'Admin') {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer cet animal.');
        }

        $animal = Animal::findOrFail($id);
        $animal->delete();

        return redirect()->route('admin.animals')->with('success', 'Animal supprimé avec succès.');
    }
}