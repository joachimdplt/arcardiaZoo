<?php
use App\Models\Breed;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test pour lister toutes les races
it('can list breeds', function () {
    Breed::factory()->count(3)->create();

    $response = $this->getJson('/api/breeds');

    $response->assertStatus(200);
    $response->assertJsonCount(3);  // Vérifier qu'il y a bien 3 races dans la réponse
});

// Test pour créer une race en tant qu'administrateur
it('can create a breed as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Données pour créer une race
    $data = ['label' => 'Lion'];

    // Requête pour créer une race
    $response = $this->postJson('/api/breeds', $data);

    $response->assertStatus(201);  // Vérifier que la race a été créée
    $this->assertDatabaseHas('breeds', $data);  // Vérifier que la race est bien dans la base de données
});

// Test pour empêcher un invité de créer une race
it('forbids guest from creating a breed', function () {
    $data = ['label' => 'Lion'];

    $response = $this->postJson('/api/breeds', $data);

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseMissing('breeds', $data);  // Vérifier que la race n'est pas créée dans la base de données
});

// Test pour mettre à jour une race en tant qu'employé
it('can update a breed as employee', function () {
    // Créer un utilisateur employé
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    // Authentification en tant qu'employé
    $this->actingAs($employee);

    // Créer une race existante
    $breed = Breed::factory()->create();

    // Données pour la mise à jour
    $data = ['label' => 'Updated Lion'];

    // Requête pour mettre à jour la race
    $response = $this->putJson("/api/breeds/{$breed->id}", $data);

    $response->assertStatus(200);  // Vérifier que la mise à jour a réussi
    $this->assertDatabaseHas('breeds', $data);  // Vérifier que la mise à jour est bien en base de données
});

// Test pour empêcher un invité de mettre à jour une race
it('forbids guest from updating a breed', function () {
    $breed = Breed::factory()->create();

    $data = ['label' => 'Updated Lion'];

    $response = $this->putJson("/api/breeds/{$breed->id}", $data);

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseMissing('breeds', $data);  // Vérifier que la race n'a pas été mise à jour dans la base de données
});

// Test pour supprimer une race en tant qu'administrateur
it('can delete a breed as admin', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    // Authentification en tant qu'admin
    $this->actingAs($admin);

    // Créer une race existante
    $breed = Breed::factory()->create();

    // Requête pour supprimer la race
    $response = $this->deleteJson("/api/breeds/{$breed->id}");

    $response->assertStatus(204);  // Vérifier que la suppression a réussi
    $this->assertDatabaseMissing('breeds', ['id' => $breed->id]);  // Vérifier que la race a bien été supprimée de la base de données
});

// Test pour empêcher un invité de supprimer une race
it('forbids guest from deleting a breed', function () {
    $breed = Breed::factory()->create();

    $response = $this->deleteJson("/api/breeds/{$breed->id}");

    $response->assertStatus(403);  // Vérifier que l'accès est refusé
    $this->assertDatabaseHas('breeds', ['id' => $breed->id]);  // Vérifier que la race n'a pas été supprimée de la base de données
});