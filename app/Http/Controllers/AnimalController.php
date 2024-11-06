<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Breed;
use App\Models\Habitat;
use App\Models\Image;
use App\Models\AnimalFeed;
use App\Models\ConsultationAnimal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
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

    // Méthode pour enregistrer le clic sur un animal
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
            \Log::error("Erreur lors de l'enregistrement du clic pour l'animal : " . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de l\'enregistrement du clic'], 500);
        }
    }
   

    // Méthode pour afficher les statistiques des clics d’animaux
    public function showAnimalStats()
    {
        $animalStats = $this->collection->find()->toArray();
        return Inertia::render('Admin/Stats', [
            'animalStats' => $animalStats
        ]);
    }
    
    public function animals()
    {
        $animals = Animal::with('breed', 'images', 'habitats')->get(); 
        $userRoles = auth()->user()->roles->pluck('label')->toArray();
    
        return Inertia::render('Admin/Animals', [
            'animals' => $animals,
            'userRoles' => $userRoles, // Passer les rôles utilisateur
        ]);
    }
    
  public function create()
  {
      // Récupérer les rôles de l'utilisateur connecté
      $userRoles = auth()->user()->roles->pluck('label')->toArray();
  
      // Vérifier si l'utilisateur est un administrateur
      if (!in_array('Admin', $userRoles)) {
          abort(403, 'Vous n\'êtes pas autorisé à créer un animal.');
      }
  
      $breeds = Breed::all();  // Récupérer toutes les races
      $habitats = Habitat::all();  // Récupérer tous les habitats
  
      // Passer les rôles utilisateurs à la vue
      return Inertia::render('Admin/AnimalCreate', [
          'breeds' => $breeds,
          'habitats' => $habitats,
          'userRoles' => $userRoles, // Passer les rôles utilisateur
      ]);
  }

 // AnimalController.php

 // Dans le contrôleur qui rend la vue `AnimalShow`
public function show($animalId)
{
    $animal = Animal::with('breed', 'images', 'habitats', 'veterinaryReports')->findOrFail($animalId);
    $lastVeterinaryReport = $animal->veterinaryReports->last();
    $userRoles = auth()->user()->roles->pluck('label')->toArray(); // Récupérer les rôles de l'utilisateur connecté

    return Inertia::render('Admin/AnimalShow', [
        'animal' => $animal,
        'lastVeterinaryReport' => $lastVeterinaryReport,
        'userRoles' => $userRoles, // Transmettre les rôles de l'utilisateur à la vue
    ]);
}
  // Méthode edit
  public function edit($id)
  {
      $animal = Animal::with('images', 'habitats')->findOrFail($id); // Charger 'habitats'
      $habitats = Habitat::all();

      return Inertia::render('Admin/AnimalUpdate', [
          'animal' => $animal,
          'habitats' => $habitats,
          'existingImages' => $animal->images,
      ]);
  }

  public function store(Request $request)
  {
      // Valider les champs d'entrée
      $request->validate([
          'name' => 'required|string|max:255',
          'status' => 'required|string',
          'habitat_id' => 'required|exists:habitats,id', // Habitat doit exister
          'breed_id' => 'required|exists:breeds,id', // Race doit exister
          'images' => 'nullable|array',
          'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Limites sur les images
      ]);
  
      // Créer l'animal avec les données basiques
      $animal = Animal::create($request->only('name', 'status', 'breed_id'));
  
      // Attacher l'habitat sélectionné à l'animal via la table pivot
      $animal->habitats()->attach($request->input('habitat_id'));
  
      // Gestion des images si elles sont fournies
      if ($request->hasFile('images')) {
          foreach ($request->file('images') as $image) {
              // Stocker l'image dans le dossier 'public/animal_images'
              $imagePath = $image->store('animal_images', 'public');
  
              // Créer une instance du modèle Image pour l'enregistrement
              $imageModel = Image::create([
                  'image_data' => $imagePath,
                  'name' => $image->getClientOriginalName(),
              ]);
  
              // Attacher l'image à l'animal dans la table pivot
              $animal->images()->attach($imageModel->id);
          }
      }
  
      // Rediriger avec un message de succès
      return redirect()->route('admin.animals')->with('success', 'Animal créé avec succès.');
  }
  public function update(Request $request, $id)
  {
      $request->validate([
          'name' => 'nullable|max:255',
          'status' => 'nullable',
          'breed_id' => 'nullable|exists:breeds,id',
          'habitat_id' => 'required|exists:habitats,id', // Valider l'habitat sélectionné
          'images' => 'nullable|array',
          'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);
  
      $animal = Animal::findOrFail($id);
      
      // Mise à jour des informations de l'animal
      $animal->update($request->only('name', 'status', 'breed_id'));
  
      // Synchroniser l'habitat sélectionné dans la table pivot
      $animal->habitats()->sync($request->input('habitat_id'));
  
      // Gestion des nouvelles images
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

    // Supprimer un animal
    public function destroy($id)
    {
        $animal = Animal::findOrFail($id);
        $animal->delete();

        return redirect()->route('admin.animals')->with('success', 'Animal supprimé avec succès.');
    }

    // Supprimer une image
    public function deleteImage($animalId, $imageId)
    {
        $animal = Animal::findOrFail($animalId);
        $image = $animal->images()->findOrFail($imageId);

        // Supprimer l'image du stockage
        Storage::delete('public/' . $image->image_data);

        // Supprimer l'image de la base de données et de la relation pivot
        $animal->images()->detach($imageId);
        $image->delete();

        return response()->json(['message' => 'Image supprimée avec succès'], 200);
    }
    public function createFeed($id)
{
    $animal = Animal::findOrFail($id);
    return Inertia::render('Admin/AnimalFeedCreate', [
        'animal' => $animal
    ]);
}
public function storeFeed(Request $request, $id)
{
    $request->validate([
        'feed_type' => 'required|string',
        'quantity' => 'required|string',
        'notes' => 'nullable|string',
    ]);

    AnimalFeed::create([
        'animal_id' => $id,
        'feed_type' => $request->input('feed_type'),
        'quantity' => $request->input('quantity'),
        'notes' => $request->input('notes'),
    ]);

    return redirect()->route('admin.animals.show', $id)->with('success', 'Alimentation ajoutée avec succès.');
}

}