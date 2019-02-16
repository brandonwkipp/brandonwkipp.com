<?php

use Intersect\Http\Router\Route;

return [
    Route::get('/', 'App\Controllers\IndexController#index'),
    Route::get('/blog-editor', 'App\Controllers\BlogController#editor'),
    //Route::get('/commodities', 'App\Controllers\CommodityController#index'),
    Route::get('/webhook/:repo', 'App\Controllers\IndexController#getRepo')
];
