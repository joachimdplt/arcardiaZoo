<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class DocumentationController
{
    public function show()
    {
        return Inertia::render('Admin/Documentation');
    }
}