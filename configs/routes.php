<?php

use Intersect\Http\Router\Route;

return [
    Route::get('/', 'App\Controllers\IndexController#index'),
    Route::get('/commodities', 'App\Controllers\CommodityController#index'),
    Route::get('/product', 'App\Controllers\IndexController#product'),
    Route::get('/webhook/:repo', 'App\Controllers\IndexController#getRepo')
];
