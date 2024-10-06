<?php
use App\Models\User;
use App\Models\Role;
use App\Models\Habitat;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test : Liste des habitats (accessible à tous)
it('can list habitats', function () {
    Habitat::factory()->count(3)->create();

    $response = $this->getJson('/api/habitats');
    
    $response->assertStatus(200);
    $response->assertJsonCount(3); // Vérifie que 3 habitats sont retournés
});

// Test : Un utilisateur admin peut créer un habitat
it('admin can create a habitat', function () {
    // Créer un utilisateur avec le rôle admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $data = [
        'name' => 'Savannah',
        'description' => 'Large savannah with wild animals',
        'comment' => 'Hot climate',
    ];

    $response = $this->postJson('/api/habitats', $data);

    $response->assertStatus(201);  // Vérifie que l'habitat est créé avec succès
    $this->assertDatabaseHas('habitats', $data);  // Vérifie que l'habitat est bien dans la base de données
});

// Test : Un utilisateur employé peut créer un habitat
it('employee can create a habitat', function () {
    // Créer un utilisateur avec le rôle employé
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $data = [
        'name' => 'Jungle',
        'description' => 'Dense jungle with lots of greenery',
        'comment' => 'Humid climate',
    ];

    $response = $this->postJson('/api/habitats', $data);

    $response->assertStatus(201);  // Vérifie que l'habitat est créé avec succès
    $this->assertDatabaseHas('habitats', $data);  // Vérifie que l'habitat est bien dans la base de données
});

// Test : Un utilisateur non autorisé ne peut pas créer un habitat
it('non-authorized user cannot create a habitat', function () {
    // Créer un utilisateur sans rôle particulier
    $user = User::factory()->create();

    $this->actingAs($user);  // Authentification en tant qu'utilisateur non autorisé

    $data = [
        'name' => 'Desert',
        'description' => 'Dry and hot desert habitat',
        'comment' => 'Extremely hot climate',
    ];

    $response = $this->postJson('/api/habitats', $data);

    $response->assertStatus(403);  // Vérifie que l'accès est refusé (403)
});

// Test : Un admin peut mettre à jour un habitat
it('admin can update a habitat', function () {
    // Créer un utilisateur avec le rôle admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $habitat = Habitat::factory()->create();

    $data = [
        'name' => 'Updated Savannah',
        'description' => 'Updated description for savannah',
        'comment' => 'Updated climate info',
    ];

    $response = $this->putJson("/api/habitats/{$habitat->id}", $data);

    $response->assertStatus(200);  // Vérifie que la mise à jour est réussie
    $this->assertDatabaseHas('habitats', $data);  // Vérifie que l'habitat mis à jour est bien dans la base de données
});

// Test : Un employé peut mettre à jour un habitat
it('employee can update a habitat', function () {
    // Créer un utilisateur avec le rôle employé
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $habitat = Habitat::factory()->create();

    $data = [
        'name' => 'Updated Jungle',
        'description' => 'Updated description for jungle',
        'comment' => 'Updated climate info',
    ];

    $response = $this->putJson("/api/habitats/{$habitat->id}", $data);

    $response->assertStatus(200);  // Vérifie que la mise à jour est réussie
    $this->assertDatabaseHas('habitats', $data);  // Vérifie que l'habitat mis à jour est bien dans la base de données
});

// Test : Un utilisateur non autorisé ne peut pas mettre à jour un habitat
it('non-authorized user cannot update a habitat', function () {
    // Créer un utilisateur sans rôle particulier
    $user = User::factory()->create();

    $this->actingAs($user);  // Authentification en tant qu'utilisateur non autorisé

    $habitat = Habitat::factory()->create();

    $data = [
        'name' => 'Unauthorized Update',
        'description' => 'This update should not be allowed',
        'comment' => 'Unauthorized comment',
    ];

    $response = $this->putJson("/api/habitats/{$habitat->id}", $data);

    $response->assertStatus(403);  // Vérifie que l'accès est refusé (403)
});

// Test : Un admin peut supprimer un habitat
it('admin can delete a habitat', function () {
    // Créer un utilisateur avec le rôle admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $habitat = Habitat::factory()->create();

    $response = $this->deleteJson("/api/habitats/{$habitat->id}");

    $response->assertStatus(204);  // Vérifie que l'habitat est supprimé
    $this->assertDatabaseMissing('habitats', ['id' => $habitat->id]);  // Vérifie que l'habitat est bien supprimé de la base de données
});

// Test : Un utilisateur non autorisé ne peut pas supprimer un habitat
it('non-authorized user cannot delete a habitat', function () {
    // Créer un utilisateur sans rôle particulier
    $user = User::factory()->create();

    $this->actingAs($user);  // Authentification en tant qu'utilisateur non autorisé

    $habitat = Habitat::factory()->create();

    $response = $this->deleteJson("/api/habitats/{$habitat->id}");

    $response->assertStatus(403);  // Vérifie que l'accès est refusé (403)
});