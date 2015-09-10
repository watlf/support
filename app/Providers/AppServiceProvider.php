<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use ReCaptcha\ReCaptcha;
use Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('captcha', function($attribute, $value, $parameters){
            $recaptcha = new ReCaptcha(env('RECAPTCHA_SECRETKEY'));

            $resp = $recaptcha->verify($value);

            return $resp->isSuccess();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
