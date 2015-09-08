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
                    <form method="post" action="auth/register">
                        {!! csrf_field() !!}
                        <h2 class="form-signin-heading">Please complete the form</h2>
                        <div class="form-group">
                            <label for="inputName" class="sr-only">Name</label>
                            <input type="text" id="inputName" class="form-control" placeholder="Your name" required="" name="name" value="{{ old('name') }}">
                        </div>
                        <div class="form-group">
                            <label for="inputEmail" class="sr-only">Email</label>
                            <input type="text" id="inputEmail" class="form-control" placeholder="Email address" required="" name="email" value="{{ old('email') }}">
                        </div>
                        <div class="form-group">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" name="password">
                        </div>
                        <div class="form-group">
                            <label for="inputRepeatPassword" class="sr-only">Repeat Password</label>
                            <input type="password" id="inputRepeatPassword" class="form-control" placeholder="Repeat password" required="" name="repeat_password">
                        </div>
                        <button class="btn btn-lx btn-success" type="submit">Registration</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@stop