<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SearchController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post( '/logout', [AuthController::class, 'logout']);
    Route::post( '/search', [SearchController::class, 'search']);
    Route::post( '/getSources', [SearchController::class, 'getSources']);
    Route::post( '/getCategoryNews', [SearchController::class, 'getCategoryNews']);
    Route::post( '/getSourceNews', [SearchController::class, 'getSourceNews']);
    Route::post( '/getSelectedCategories', [SearchController::class, 'getSelectedCategories']);
    Route::post( '/getSelectedSources', [SearchController::class, 'getSelectedSources']);
});

Route::post( '/register', [AuthController::class, 'register']);
Route::post( '/login', [AuthController::class, 'login']);
