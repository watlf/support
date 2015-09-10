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


Route::get('admin/profile', ['middleware' => 'auth', function () {
    //
}]);


Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function ()    {
        return view('welcome');
    });

    Route::get('user/profile', function () {
        view('user.profile');
    });

    Route::get('admin/panel', ['middleware' => 'auth.admin', function () {
        //
    }]);


    Route::get('auth/logout', 'Auth\AuthController@getLogout');
});

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');


// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::get('register/verify/{confirmationCode}', 'Auth\RegistrationController@confirm');
Route::post('auth/register', 'Auth\RegistrationController@store');


Route::controllers([
    'password' => 'Auth\PasswordController',
]);
