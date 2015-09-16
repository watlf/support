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

use App\Delivery;
use App\Role;
use App\Source;
use App\User;
use Carbon\Carbon;

Route::model('sources',Source::class);
Route::model('headlines',\App\Headline::class);
Route::model('users',\App\User::class);
Route::model('roles',\App\Role::class);
Route::model('actions',\App\Action::class);
Route::model('settings',\App\Settings::class);
Route::model('unsubscriptions',\App\Unsubscription::class);

Route::get('/',['as'=>'site.index','uses'=>'SiteController@index']);
Route::get('/contact_us', ['as' => 'site.contact_us.index','uses' => 'SiteController@getContact_us']);
Route::get('/about_us', ['as' => 'site.about_us.index','uses' => 'SiteController@getAbout_us']);
Route::post('/contact_us',['as' => 'site.contact_us.post','uses' => 'SiteController@contact_us']);
Route::post('/subscribe', ['as' => 'site.subscribe.post','uses' => 'SiteController@subscribe']);
Route::post('/share', ['as' => 'site.share.post','uses' => 'SiteController@share']);
Route::post('/suggest', 'SiteController@suggest');

Route::get('/invite', ['as' => 'invite.index','uses' => 'InviteController@index']);
Route::post('/invite',['as' => 'invite.store','uses' => 'InviteController@store']);

Route::group(['prefix' => 'api'],function(){
    Route::group([
        'prefix' => 'admin',
        'namespace'=>'Admin',
        'middleware'=>[
            'auth',
            'access.role:admin'
        ]
    ],function(){

        Route::bind('deliveries',function($value,\Illuminate\Routing\Route $route){
            if (preg_match('/\d{4}-\d{2}-\d{2}/',$value)){
                if (is_null($delivery = Delivery::daily(Carbon::parse($value)->startOfDay())->first())){
                    $delivery = Delivery::create([
                        'subscription_type'=>config("subscription.type.daily"),
                        'created_at' => Carbon::parse($value)->startOfDay()
                    ]);
                };
                return $delivery;
            }
            if (preg_match('/^(weekly|daily)$/',$value)){
                if (is_null($delivery = Delivery::$value(Carbon::today())->first())){
                    $delivery = Delivery::create([
                        'subscription_type'=>config("subscription.type.$value")
                    ]);
                }
                return $delivery;
            }
            return Delivery::findOrFail($value);
        });
        Route::bind('roles',function($value,\Illuminate\Routing\Route $route){
            if (is_numeric($value))
                return Role::findOrFail($value);
            return Role::whereName($value)->firstOrFail();
        });

        Route::resource('deliveries','DeliveryController');
        Route::get('/deliveries/{deliveries}/preview','EmailController@preview');
        Route::post('/deliveries/{deliveries}/send','EmailController@send');

        Route::resource('settings','SettingsController',['only' => ['index','update']]);
        Route::resource('unsubscriptions','UnsubscriptionController',['only' => ['index']]);

        Route::get('/statistic/{event}', 'StatisticController@index');

        Route::resource('deliveries.sources', 'DeliverySourceController');
        Route::resource('deliveries.headlines', 'DeliveryHeadlineController');
        Route::resource('sources','SourceController');
        Route::resource('sources.headlines','SourceHeadlineController');
        Route::resource('headlines','HeadlineController');
        Route::resource('users','UserController');
        Route::resource('users.roles','UserRoleController');
        Route::resource('actions','ActionController');
        Route::resource('roles','RoleController');
        Route::resource('roles.actions','RoleActionController');
    });
});

Route::group([
    'prefix' => 'admin',
    'namespace'=>'Admin',
    'middleware'=>[
        'auth',
        'access.panel'
    ]],function(){
    Route::get('/{a?}/{b?}/{c?}',['as'=>'admin.index','uses'=>'AdminController@index']);
});
Route::get('email/{email}/preview','EmailController@show');

Route::group([
    'middleware'=>[
        'auth'
    ]],function(){
    Route::bind('subscriptions',function($value,\Illuminate\Routing\Route $route){
        if (is_null($user = User::whereEmail(base64_decode($value))->first())){
            if (is_numeric($value)){
                $user = User::findOrFail($value);
            }else{
                abort(404);
            }
        };
        Auth::login($user,true);
        return $user;
    });
    Route::get('subscriptions/{subscriptions}',['as'=>'users.sources.index','uses'=>'UserController@getSources']);
    Route::put('subscriptions/{subscriptions}',['as'=>'users.sources.update','uses'=>'UserController@putSources']);
    Route::delete('subscriptions/{subscriptions}',['as'=>'users.sources.delete','uses'=>'UserController@deleteSources']);


    Route::post('subscriptions/{subscriptions}/message','UserController@message');
});
Route::post('/sendgrid/webhook','SendgridController@webhook');

// Authentication routes...
Route::get('auth/login',  ['as' => 'auth.login.get','uses' => 'Auth\AuthController@getLogin']);
Route::post('auth/login', ['as' => 'auth.login.post','uses' => 'Auth\AuthController@postLogin']);
Route::get('auth/logout', ['as' => 'auth.logout','uses' => 'Auth\AuthController@getLogout']);
