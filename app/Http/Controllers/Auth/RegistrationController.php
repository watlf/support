<?php

namespace App\Http\Controllers\Auth;

use App\Country;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\User;

class RegistrationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name' => 'required|min:2',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
            'country' => 'required|min:3',
            'g-recaptcha-response' => 'required|captcha',
        ],[
            'g-recaptcha-response.required' => 'The captcha is required',
            'g-recaptcha-response.captcha' => 'It\'s not so simple, bu-ga-ga.'
        ]);

        $confirmation_code = str_random(30);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'confirmation_code' => $confirmation_code
        ]);

        $country = Country::firstOrCreate(['name' => $request->input('country')]);

        $user->countries()->save($country);

        Mail::send('email.verify', ['confirmation_code' => $confirmation_code], function($message) use ($request) {
            $message->to($request->input('email'), $request->input('name'))
                ->subject('Verify your email address');
        });

        $request->session()->flash('isRegister', true);

        return redirect('auth/register');
    }

    /**
     * @param string $confirmation_code
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function confirm($confirmation_code)
    {
        $user = User::whereConfirmationCode($confirmation_code)->first();

        if (!$user)
        {
            return redirect('auth/register');
        }

        Auth::login($user);

        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        return redirect('/');
    }
}
