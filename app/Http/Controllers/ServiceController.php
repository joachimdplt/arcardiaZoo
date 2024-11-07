<?php
namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    // Afficher la liste des services (accessible à tous)
    public function index()
    {
        $services = Service::with('images')->get();
        return Inertia::render('Admin/Services', [
            'services' => $services,
        ]); 
    }
 
    // Créer un nouveau service (formulaire de création)
    public function create()
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isEmployee()) {
            abort(403, 'Vous n\'êtes pas autorisé à créer un service.');
        }

        return Inertia::render('Admin/ServicesCreate');
    }

    // Enregistrer un nouveau service
    public function store(Request $request)
    {
        $user = auth()->user();
        if ($user===null) {
            abort(403, 'Vous n\'êtes pas autorisé à enregistrer ce service.');
        }
        if (!auth()->user()->isAdmin() && !auth()->user()->isEmployee()) {
            abort(403, 'Vous n\'êtes pas autorisé à créer un service.');
        }

        $request->validate([
            'name' => 'required|max:50',
            'description' => 'required',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_visible' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $service = Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_visible' => $request->is_visible ?? true,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('service_images', 'public');
                $imageModel = Image::create([
                    'image_data' => $imagePath,
                    'name' => $image->getClientOriginalName()
                ]);
                $service->images()->attach($imageModel->id);
            }
        }

        return redirect()->route('admin.services')->with('success', 'Service créé avec succès.');
    }

    // Afficher le formulaire d'édition pour un service spécifique
    public function edit($id)
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isEmployee()) {
            abort(403, 'Vous n\'êtes pas autorisé à modifier ce service.');
        }

        $service = Service::with('images')->findOrFail($id);
        return Inertia::render('Admin/ServiceUpdate', [
            'service' => $service,
            'existingImages' => $service->images,
        ]);
    }

    // Mettre à jour un service spécifique
    public function update(Request $request, $id)
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isEmployee()) {
            abort(403, 'Vous n\'êtes pas autorisé à modifier ce service.');
        }

        $request->validate([
            'name' => 'nullable|max:50',
            'description' => 'nullable',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'is_visible' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $service = Service::findOrFail($id);
        $service->update([
            'name' => $request->name ?? $service->name,
            'description' => $request->description ?? $service->description,
            'start_time' => $request->start_time ?? $service->start_time,
            'end_time' => $request->end_time ?? $service->end_time,
            'is_visible' => $request->is_visible ?? $service->is_visible,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('service_images', 'public');
                $imageModel = Image::create([
                    'image_data' => $imagePath,
                    'name' => $image->getClientOriginalName(),
                ]);
                $service->images()->attach($imageModel->id);
            }
        }

        return redirect()->route('admin.services')->with('success', 'Service mis à jour avec succès.');
    }

    // Supprimer un service spécifique
    public function destroy($id)
    {
        if (!auth()->user()->isAdmin() && !auth()->user()->isEmployee()) {
            abort(403, 'Vous n\'êtes pas autorisé à supprimer ce service.');
        }

        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->route('admin.services')->with('success', 'Service supprimé avec succès.');
    }

    public function deleteImage($serviceID, $imageId)
    {
        $service = Service::findOrFail($serviceID);
        $image = $service->images()->findOrFail($imageId);

        // Supprimer l'image du stockage
        Storage::delete('public/' . $image->image_data);

        // Supprimer l'image de la base de données et de la relation pivot
        $service->images()->detach($imageId);
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
}