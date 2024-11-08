<?php
use App\Models\Role;
use App\Models\User;
use App\Models\Animal;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can list roles', function () {
    Role::factory()->count(3)->create();

    $response = $this->getJson('/api/roles');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create a role', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $data = ['label' => 'Admin'];

    $response = $this->postJson('/api/roles', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('roles', $data);
});

it('can show a specific role', function () {
    $role = Role::factory()->create();

    $response = $this->getJson("/api/roles/{$role->id}");

    $response->assertStatus(200);
    $response->assertJson(['id' => $role->id, 'label' => $role->label]);
});

it('can update a role', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $role = Role::factory()->create();
    $data = ['label' => 'Updated Role'];

    $response = $this->putJson("/api/roles/{$role->id}", $data);

    $response->assertStatus(200);
    $this->assertDatabaseHas('roles', $data);
});

it('can delete a role', function () {
    // Créer un utilisateur admin
    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $role = Role::factory()->create();

    $response = $this->deleteJson("/api/roles/{$role->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('roles', ['id' => $role->id]);
});

// Tests similaires pour les autres entités

it('can create a service', function () {
    // Créer un utilisateur employé ou Admin
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);


    $this->actingAs($employee);  // Authentification en tant qu'employé

    $data = [
        'name' => 'Service Name', 
        'description' => 'Service Description',
        'start_time' => '12:00',
        'end_time' => '14:00',
    ];

    $response = $this->postJson('/api/services', $data);

    $response->assertStatus(302);
    $this->assertDatabaseHas('services', $data);

    $this->actingAs($admin);  // Authentification en tant qu'admin
    $data = [
        'name' => 'Service Name', 
        'description' => 'Service Description',
        'start_time' => '12:00',
        'end_time' => '14:00',
    ];

    $response = $this->postJson('/api/services', $data);

    $response->assertStatus(302);
    $this->assertDatabaseHas('services', $data);

});

it('forbids non-admin from creating a role', function () {
    // Créer un utilisateur non-admin (par exemple, un employé)
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    // Authentification en tant qu'employé
    $this->actingAs($employee);

    $data = ['label' => 'Manager'];

    $response = $this->postJson('/api/roles', $data);

    // Vérifier que l'employé ne peut pas créer un rôle
    $response->assertStatus(403);
    $this->assertDatabaseMissing('roles', $data);
});

it('forbids guest from accessing protected routes', function () {
    $response = $this->get('/dashboard'); 

    // Vérifie que l'utilisateur est redirigé vers la page de connexion
    $response->assertRedirect('/login');
});


it('forbids guests, employee and veterinary to create a habitat', function () {

    // Créer un utilisateur admin 

    $admin = User::factory()->create();
    $adminRole = Role::factory()->create(['label' => 'Admin']);
    $admin->roles()->attach($adminRole);

    $this->actingAs($admin);  // Authentification en tant qu'admin

    $data = ['name' => 'Forest', 'description' => 'Dense forest', 'comment' => 'High humidity'];

    $response = $this->postJson('/api/habitats', $data);

    $response->assertStatus(302);
    $this->assertDatabaseHas('habitats', $data);
});

it('can create a veterinary report with associated user and animal', function () {
    // Créer un utilisateur vétérinaire
    $veterinarian = User::factory()->create();
    $vetRole = Role::factory()->create(['label' => 'Veterinary']);
    $veterinarian->roles()->attach($vetRole);

    $this->actingAs($veterinarian);  // Authentification en tant que vétérinaire

    $animal = Animal::factory()->create();
    $data = [
        'date' => now()->toDateString(),
        'details' => 'Report details',
        'animal_id' => $animal->id,
        'user_id' => $veterinarian->id,
    ];

    $response = $this->postJson('/api/veterinary-reports', $data);

    $response->assertStatus(302);
    $this->assertDatabaseHas('veterinary_reports', $data);
});

// Tests pour vérifier les permissions par rôle
it('forbids non-admin from deleting a role', function () {
    // Créer un utilisateur non-admin (employé par exemple)
    $employee = User::factory()->create();
    $employeeRole = Role::factory()->create(['label' => 'Employee']);
    $employee->roles()->attach($employeeRole);

    $this->actingAs($employee);  // Authentification en tant qu'employé

    $role = Role::factory()->create();

    $response = $this->deleteJson("/api/roles/{$role->id}");

    // Vérifier que l'employé ne peut pas supprimer un rôle
    $response->assertStatus(403);
});