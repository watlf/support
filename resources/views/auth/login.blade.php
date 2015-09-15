@extends('layouts.master')

@section('title', 'T-Mobile Login')


@section('content')
    <div class="navbar-header">
        <a class="navbar-brand page-scroll" href="{{url('/')}}">T-Mobile</a>
    </div>
    <section style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <form method="post" action="/auth/login">
                        {!! csrf_field() !!}
                        <h2 class="form-signin-heading">Please sign in</h2>
                        @if($errors->first('email'))
                            <div class="alert alert-warning">
                                <strong>{{ $errors->first('email') }}</strong>
                                <a href="/auth/password">Forgot your password?</a>
                            </div>
                        @endif
                        <div class="form-group input-wrapper" data-name="email">
                            <label for="inputEmail" class="sr-only">Email</label>
                            <input type="email" class="form-control" placeholder="Email address" required="" name="email" value="{{ old('email') }}">
                        </div>
                        <div class="form-group input-wrapper" data-name="password">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" class="form-control" placeholder="Password" required="" name="password">
                            <span class="error-block">{{ $errors->first('password') }}</span>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me" name="remember">
                                Remember me
                            </label>
                        </div>
                        <button class="btn btn-lx btn-success" type="submit">Sign in</button>
                        <div class="form-group">
                            <p>
                                Don't Have an Account?
                                <a href="/auth/register">Register.</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    @include('layouts.footer')
@endsection

