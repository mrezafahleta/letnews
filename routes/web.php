<?php

use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/post', [PostController::class, 'index'], function () {
})->middleware(['auth'])->name('post.page');


Route::middleware('auth')->group(function () {
    Route::get('/post', [PostController::class, 'index'])->name('post.page');
    Route::get('post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('post/create', [PostController::class, 'store'])->name('post.store');
    Route::get("/post/{post:slug}/detail_post", [PostController::class, 'detail_post'])->name('post.detail');
    Route::post('/post/{post:slug}/detail_post', [PostController::class, 'update'])->name('post.update');
    Route::delete('/post/{post:id}', [PostController::class, 'destroy'])->name('post.delete');
});

require __DIR__ . '/auth.php';
