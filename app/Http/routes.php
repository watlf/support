<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function ()    {
        return view('welcome');
    });

    Route::controller('user', 'UserProfileController');

    Route::group(['prefix' => 'admin', 'middleware' => ['access.role:admin']], function () {
        Route::get('/', function(){
            return view('admin.index');
        });

        Route::resource('users', 'UserProfileController');
    });

    Route::post('ask/{user?}', 'QuestionsController@create');

    Route::get('auth/logout', 'Auth\AuthController@getLogout');
});

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');


// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::get('register/verify/{confirmationCode}', 'Auth\RegistrationController@confirm');
Route::post('auth/register', 'Auth\RegistrationController@store');

