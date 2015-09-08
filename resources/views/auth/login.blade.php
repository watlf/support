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
                    <form id="formLogin" action="auth/login">
                        {!! csrf_field() !!}
                        <h2 class="form-signin-heading">Please sign in</h2>
                        <div class="form-group">
                            <label for="inputEmail" class="sr-only">Email</label>
                            <input type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" name="email" value="">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" name="password">
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
@stop