<?php

use Intersect\Http\Router\Route;

return [
    Route::get('/', 'App\Controllers\IndexController#index'),
    Route::get('/blog', 'App\Controllers\BlogController#display'),
    Route::get('/blog/posts/id/:id', 'App\Controllers\BlogController#postById'),
    Route::get('/blog-editor', 'App\Controllers\BlogController#editor'),
    //Route::get('/commodities', 'App\Controllers\CommodityController#index'),
//    Route::get('/webhook/:repo', 'App\Controllers\IndexController#getRepo'),

    Route::post('/submit-post', 'App\Controllers\BlogController#submitPost'),
];
