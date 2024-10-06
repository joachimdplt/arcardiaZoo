<?php
use App\Models\Image;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Simuler le stockage des fichiers lors des tests
    Storage::fake('images');
});

// Test pour créer une image en tant qu'administrateur
it('can create an image as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Fichier image fictif
    $file = UploadedFile::fake()->image('image.jpg');

    // Requête pour créer une image
    $response = $this->postJson('/api/images', [
        'image_data' => $file,
    ]);

    // Vérifier que l'image a été créée avec succès
    $response->assertStatus(201);

    // Vérifier que le fichier a bien été stocké
    $this->assertDatabaseCount('images', 1);
});

