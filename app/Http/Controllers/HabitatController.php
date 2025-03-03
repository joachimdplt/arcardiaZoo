<?php
namespace App\Http\Controllers;

use App\Models\Habitat;
use App\Models\Image;
use MongoDB\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HabitatController extends Controller
{
    protected $mongoClient;
    protected $collection;

    public function __construct()
    {
        try {
            $host = env('DB_HOST_MONGODB', '127.0.0.1');
            $port = env('DB_PORT_MONGODB', '27017');
            $database = env('DB_DATABASE_MONGODB', 'arcadia_zoo_mongo');
            $uri = "mongodb://$host:$port";

            $this->mongoClient = new Client($uri);
            $this->collection = $this->mongoClient->selectCollection($database, 'consultations_habitat');
        } catch (\Exception $e) {
            \Log::error("Erreur de connexion à MongoDB : " . $e->getMessage());
            abort(500, "Impossible de se connecter à MongoDB.");
        }
    }

    public function recordClick($id)
    {
        try {
            $this->collection->updateOne(
                ['habitat_id' => $id],
                ['$inc' => ['click_count' => 1]],
                ['upsert' => true]
            );

            return back()->with('success', 'Clic enregistré avec succès.');
        } catch (\Exception $e) {
            \Log::error("Erreur lors de l'enregistrement du clic pour l'habitat : " . $e->getMessage());
            return back()->with('error', 'Erreur lors de l\'enregistrement du clic.');
        }
    }

    public function showCombinedStats()
    {
        try {
            $habitatStats = $this->collection->find()->toArray();
            $habitatIds = array_column($habitatStats, 'habitat_id');

            $habitats = Habitat::whereIn('id', $habitatIds)->pluck('name', 'id')->toArray();
            foreach ($habitatStats as &$stat) {
                $stat['name'] = $habitats[$stat['habitat_id']] ?? 'Nom non trouvé';
            }

            return Inertia::render('Admin/Stats', ['habitatStats' => $habitatStats]);
        } catch (\Exception $e) {
            \Log::error("Erreur récupération des stats habitat : " . $e->getMessage());
            return back()->with('error', 'Erreur lors de la récupération des statistiques.');
        }
    }

    public function index()
    {
        $user = Auth::user()->load('role'); // ⚠️ Charger le rôle ici
        
        $habitats = Habitat::with('animals', 'images')->get();
    
        return Inertia::render('Admin/Habitats', [
            'habitats' => $habitats,
            'userRoles' => $user->role ? [$user->role->label] : [],
        ]);
    }

    public function show($id)
    {
        $habitat = Habitat::with('animals', 'images')->findOrFail($id);
        return Inertia::render('Admin/HabitatShow', ['habitat' => $habitat]);
    }

    public function create()
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        return Inertia::render('Admin/HabitatCreate');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $habitat = Habitat::create($request->only('name', 'description'));

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

    public function edit($id)
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        $habitat = Habitat::with('images')->findOrFail($id);
        return Inertia::render('Admin/HabitatUpdate', ['habitat' => $habitat]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        $request->validate([
            'name' => 'nullable|max:255',
            'description' => 'nullable',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $habitat = Habitat::findOrFail($id);
        $habitat->update($request->only('name', 'description'));

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

        return redirect()->route('admin.habitats')->with('success', 'Habitat mis à jour avec succès.');
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user || $user->role->label !== 'Admin') {
            abort(403, 'Accès refusé.');
        }

        $habitat = Habitat::findOrFail($id);
        $habitat->delete();

        return redirect()->route('admin.habitats')->with('success', 'Habitat supprimé avec succès.');
    }
}