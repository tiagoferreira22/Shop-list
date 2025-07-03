<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::controller(ProductController::class)->group(function (){
        Route::get('dashboard', 'index')->name('dashboard');
        Route::post('/products', 'store')->name('products.store');
        Route::delete('/products/{product}', 'destroy')->name('products.destroy');
        Route::put('/products/{product}', 'update')->name('products.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
