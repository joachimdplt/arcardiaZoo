<?php
use App\Models\Animal;
use App\Models\User;
use App\Models\Role;
use App\Models\Breed;
use App\Models\Image;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test pour lister tous les animaux
it('can list animals', function () {
    Animal::factory()->count(3)->create();

    $response = $this->getJson('/api/animals');

    $response->assertStatus(200);
    $response->assertJsonCount(3);  // Vérifier qu'il y a bien 3 animaux dans la réponse
});

// Test pour créer un animal en tant qu'administrateur
it('can create an animal as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Créer une race et une image associées
    $breed = Breed::factory()->create();
    $image = Image::factory()->create();

    // Données pour créer un animal
    $data = [
        'name' => 'Lion',
        'status' => 'Healthy',
        'breed_id' => $breed->id,
        'image_id' => $image->id,
    ];

    // Requête pour créer un animal
    $response = $this->postJson('/api/animals', $data);

    $response->assertStatus(201);  // Vérifier que l'animal a été créé
    $this->assertDatabaseHas('animals', $data);  // Vérifier que l'animal est bien dans la base de données
});

// Test pour empêcher un invité de créer un animal
it('forbids guest from creating an animal', function () {
    $breed = Breed::factory()->create();
    $image = Image::factory()->create();

    $data = [
        'name' => 'Lion',
        'status' => 'Healthy',
        'breed_id' => $breed->id,
        'image_id' => $image->id,
    ];

    $response = $this->postJson('/api/animals', $data);

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseMissing('animals', $data);  // Vérifier que l'animal n'a pas été créé dans la base de données
});

// Test pour mettre à jour un animal en tant qu'employé
it('can update an animal as employee', function () {
    // Créer un utilisateur employé
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    // Authentification en tant qu'employé
    $this->actingAs($employee);

    // Créer un animal existant
    $animal = Animal::factory()->create();

    // Données pour la mise à jour
    $data = [
        'name' => 'Updated Lion',
        'status' => 'Updated Status',
        'breed_id' => $animal->breed_id,
        'image_id' => $animal->image_id,
    ];

    // Requête pour mettre à jour l'animal
    $response = $this->putJson("/api/animals/{$animal->id}", $data);

    $response->assertStatus(200);  // Vérifier que la mise à jour a réussi
    $this->assertDatabaseHas('animals', $data);  // Vérifier que la mise à jour est bien en base de données
});

// Test pour empêcher un invité de mettre à jour un animal
it('forbids guest from updating an animal', function () {
    $animal = Animal::factory()->create();

    $data = [
        'name' => 'Updated Lion',
        'status' => 'Updated Status',
        'breed_id' => $animal->breed_id,
        'image_id' => $animal->image_id,
    ];

    $response = $this->putJson("/api/animals/{$animal->id}", $data);

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseMissing('animals', $data);  // Vérifier que l'animal n'a pas été mis à jour dans la base de données
});

// Test pour supprimer un animal en tant qu'administrateur
it('can delete an animal as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Créer un animal existant
    $animal = Animal::factory()->create();

    // Requête pour supprimer l'animal
    $response = $this->deleteJson("/api/animals/{$animal->id}");

    $response->assertStatus(204);  // Vérifier que la suppression a réussi
    $this->assertDatabaseMissing('animals', ['id' => $animal->id]);  // Vérifier que l'animal a bien été supprimé de la base de données
});

// Test pour empêcher un invité de supprimer un animal
it('forbids guest from deleting an animal', function () {
    $animal = Animal::factory()->create();

    $response = $this->deleteJson("/api/animals/{$animal->id}");

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseHas('animals', ['id' => $animal->id]);  // Vérifier que l'animal n'a pas été supprimé de la base de données
});