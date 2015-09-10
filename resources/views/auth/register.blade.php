@extends('layouts.master')

@section('title', 'T-Mobile Login')

@section('content')
    <div class="navbar-header">
        <a class="navbar-brand page-scroll" href="{{url('/')}}">T-Mobile</a>
    </div>
    <section style="height: 100%">
        <div class="container">
            @if(Session::has('isRegister'))
                <div class="alert alert-success">
                    <strong>Registration successful!</strong>
                    We send instructions for confirmed registration. Check your email.
                </div>
            @endif
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <form method="post" action="/auth/register">
                        {!! csrf_field() !!}
                        <h2 class="form-signin-heading">Please complete the form</h2>
                        <div class="form-group input-wrapper" data-name="name">
                            <label for="inputName" class="sr-only">Name</label>
                            <input type="text" class="form-control" placeholder="Your name" required="" name="name" value="{{ old('name') }}">
                            <span class="text-danger">{{$errors->first('name')}}</span>
                        </div>
                        <div class="form-group input-wrapper" data-name="country">
                            <label for="inputCountry" class="sr-only">Country</label>
                            <input type="text" class="form-control" placeholder="Country of residence" required="" name="country" value="{{ old('country') }}">
                            <span class="text-danger">{{$errors->first('country')}}</span>
                        </div>
                        <div class="form-group input-wrapper" data-name="email">
                            <label for="inputEmail" class="sr-only">Email</label>
                            <input type="email" class="form-control" placeholder="Email address" required="" name="email" value="{{ old('email') }}">
                            <span class="text-danger">{{$errors->first('email')}}</span>
                        </div>
                        <div class="form-group input-wrapper" data-name="password">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" class="form-control" placeholder="Password" required="" name="password">
                            <span class="text-danger">{{$errors->first('password')}}</span>
                        </div>
                        <div class="form-group">
                            <label for="inputRepeatPassword" class="sr-only">Repeat Password</label>
                            <input type="password" class="form-control" placeholder="Repeat password" required="" name="password_confirmation">
                        </div>
                        <div class="form-group input-wrapper" data-name="g-recaptcha-response">
                            @include('layouts.captcha')
                            <span class="text-danger">{{$errors->first('g-recaptcha-response')}}</span>
                        </div>
                        <button class="btn btn-lx btn-success" type="submit">Registration</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@stop