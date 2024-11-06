<?php
namespace App\Http\Controllers;
use App\Models\Animal;
use App\Models\Habitat;
use App\Models\Image;

use MongoDB\Client;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class HabitatController extends Controller
{   
    protected $mongoClient;
    protected $collection;

    public function __construct()
    {
        // Utiliser les variables d’environnement spécifiques pour MongoDB
        $host = env('DB_HOST_MONGODB', '127.0.0.1');
        $port = env('DB_PORT_MONGODB', '27017');
        $database = env('DB_DATABASE_MONGODB', 'arcadia_zoo_mongo');
        $uri = "mongodb://$host:$port";

        // Initialiser le client MongoDB avec l'URI et sélectionnez la collection
        $this->mongoClient = new Client($uri);
        $this->collection = $this->mongoClient->selectCollection($database, 'consultations_habitat');
    }
   
    public function recordClick($id)
    {
        try {
            // Enregistrer le clic pour l'habitat dans MongoDB
            $this->collection->updateOne(
                ['habitat_id' => $id],
                ['$inc' => ['click_count' => 1]],
                ['upsert' => true]
            );

            // Récupérer les données de l'habitat après l'enregistrement du clic
            $habitat = Habitat::with('animals', 'images')->findOrFail($id);

            // Rediriger vers la page de l'habitat dans le dossier Client
            return Inertia::render('Client/HabitatsClientShow', [
                'habitat' => $habitat
            ]);
        } catch (\Exception $e) {
            \Log::error("Erreur lors de l'enregistrement du clic pour l'habitat : " . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de l\'enregistrement du clic'], 500);
        }
    }
    public function showCombinedStats()
    {
        // Obtenir les statistiques des habitats
        $habitatStats = $this->collection->find()->toArray();
        $habitatIds = array_column($habitatStats, 'habitat_id');

        // Récupérer les noms des habitats
        $habitats = Habitat::whereIn('id', $habitatIds)->pluck('name', 'id')->toArray();
        foreach ($habitatStats as &$stat) {
            $stat['name'] = $habitats[$stat['habitat_id']] ?? 'Nom non trouvé';
        }

        // Obtenir les statistiques des animaux
        $animalCollection = $this->mongoClient->selectCollection('arcadia_zoo_mongo', 'consultations_animal');
        $animalStats = $animalCollection->find()->toArray();
        $animalIds = array_column($animalStats, 'animal_id');

        // Récupérer les noms des animaux
        $animals = Animal::whereIn('id', $animalIds)->pluck('name', 'id')->toArray();
        foreach ($animalStats as &$stat) {
            $stat['name'] = $animals[$stat['animal_id']] ?? 'Nom non trouvé';
        }

        return Inertia::render('Admin/Stats', [
            'habitatStats' => $habitatStats,
            'animalStats' => $animalStats,
        ]);
    }

    public function showHabitatStats()
    {
        $habitatStats = $this->collection->find()->toArray();
        return Inertia::render('Admin/Stats', [
            'habitatStats' => $habitatStats
        ]);
    }
    public function index()
    {
        // Récupérer les rôles de l'utilisateur connecté
        $userRoles = auth()->user()->roles->pluck('label')->toArray();
    
        // Récupérer les habitats avec leurs animaux et images
        $habitats = Habitat::with('animals', 'images')->get();
    
        // Passer les habitats et les rôles de l'utilisateur à la vue
        return Inertia::render('Admin/Habitats', [
            'habitats' => $habitats,
            'userRoles' => $userRoles, // Ajouter les rôles de l'utilisateur
        ]);
    }

    // Afficher un habitat spécifique avec ses animaux et images
    public function show($id)
    {
        $habitat = Habitat::with('animals', 'images')->findOrFail($id);
        return Inertia::render('Admin/HabitatShow', [
            'habitat' => $habitat,
        ]);
    }
    public function create()
    {
        // Vérifier que l'utilisateur est un administrateur
        $userRoles = auth()->user()->roles->pluck('label')->toArray();
    
        if (!in_array('Admin', $userRoles)) {
            abort(403, 'Vous n\'êtes pas autorisé à créer un habitat.');
        }
    
        // Si l'utilisateur est administrateur, afficher la vue de création
        return Inertia::render('Admin/HabitatCreate');
    }

    public function edit($id)
{
    $userRoles = auth()->user()->roles->pluck('label')->toArray();

    // Vérifier que l'utilisateur est un admin
    if (!in_array('Admin', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à modifier cet habitat.');
    }

    $habitat = Habitat::with('images')->findOrFail($id);
    return Inertia::render('Admin/HabitatUpdate', [
        'habitat' => $habitat,
        'existingImages' => $habitat->images,
    ]);
}

public function update(Request $request, $id)
{
    $userRoles = auth()->user()->roles->pluck('label')->toArray();

    if (!in_array('Admin', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à mettre à jour cet habitat.');
    }

    // Validation des données et des images
    $request->validate([
        'name' => 'nullable|max:255',
        'description' => 'nullable',
        'location' => 'nullable',
        'comment' => 'nullable',
        'images' => 'nullable|array',
        'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $habitat = Habitat::findOrFail($id);
    $habitat->update($request->only('name', 'description', 'location', 'comment'));

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('habitat_images', 'public');
            $imageModel = Image::create([
                'image_data' => $imagePath,
                'name' => $image->getClientOriginalName()
            ]);
            $habitat->images()->attach($imageModel->id);
        }
    }

    return redirect()->route('admin.habitats')->with('success', 'Habitat et images mis à jour avec succès.');
}

public function store(Request $request)
{
    $userRoles = auth()->user()->roles->pluck('label')->toArray();

    if (!in_array('Admin', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à créer un habitat.');
    }

    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'location' => 'nullable|string|max:255',
        'comment' => 'nullable|string',
        'images' => 'nullable|array',
        'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $habitat = Habitat::create($request->only('name', 'description', 'location', 'comment'));

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('habitat_images', 'public');
            $imageModel = Image::create([
                'image_data' => $imagePath,
                'name' => $image->getClientOriginalName()
            ]);
            $habitat->images()->attach($imageModel->id);
        }
    }

    return redirect()->route('admin.habitats')->with('success', 'Habitat créé avec succès.');
}

public function destroy($id)
{
    $userRoles = auth()->user()->roles->pluck('label')->toArray();

    if (!in_array('Admin', $userRoles)) {
        abort(403, 'Vous n\'êtes pas autorisé à supprimer cet habitat.');
    }

    $habitat = Habitat::findOrFail($id);
    $habitat->delete();

    return redirect()->route('admin.habitats')->with('success', 'Habitat supprimé avec succès.');
}
   

}