<?php

use Intersect\Http\Router\Route;

return [
    Route::get('/', 'App\Controllers\IndexController#index'),
    Route::get('/product', 'App\Controllers\IndexController#product')
];
