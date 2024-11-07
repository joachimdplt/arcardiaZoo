<?php

use App\Models\Role;
use App\Models\Service;
use Inertia\Testing\AssertableInertia;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can list roles', function () {
    Role::factory()->count(3)->create();

    $response = $this->getJson('/api/roles');

    $response->assertStatus(200);
    $response->assertJsonCount(3);
});

it('can create not create a role', function () {
    $data = ['label' => 'Admin'];

    $response = $this->postJson('/api/roles', $data);

    $response->assertStatus(403);
    $this->assertDatabaseMissing('roles', $data);
});

it('can show a specific role', function () {
    $role = Role::factory()->create();

    $response = $this->getJson("/api/roles/{$role->id}");

    $response->assertStatus(200);
    $response->assertJson(['id' => $role->id, 'label' => $role->label]);
});

it('can not update a role', function () {
    $role = Role::factory()->create();
    $data = ['label' => 'Updated Role'];

    $response = $this->putJson("/api/roles/{$role->id}", $data);

    $response->assertStatus(403);
    $this->assertDatabaseMissing('roles', $data);
});

it('can not delete a role', function () {
    $role = Role::factory()->create();

    $response = $this->deleteJson("/api/roles/{$role->id}");

    $response->assertStatus(403);
    $this->assertDatabaseHas('roles', ['id' => $role->id]);
});

it('can list services', function () {
    Service::factory()->count(3)->create();

    $response = $this->get('/api/services');

    $response->assertStatus(200);
    $response->assertInertia(fn (AssertableInertia $page) =>
        $page
            ->component('Admin/Services')
            ->has('services', 3)  // Vérifie qu'il y a bien 3 services dans la réponse
    );
});

it('can not create a service if not admin', function () {
    $data = ['name' => 'Service Name', 'description' => 'Service Description'];


    $response = $this->postJson('/api/services', $data);

    $response->assertStatus(403);
    $this->assertDatabaseMissing('services', $data);
});