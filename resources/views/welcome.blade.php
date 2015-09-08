@extends('layouts.master')

@section('title', 'T-Mobile support')

@section('content')
    @include('layouts.nav')

    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1>How may we help you?</h1>
                <hr>
                <p>Contact T-Mobile Customer Service by phone, chat, or TTY. Our team is ready to help you with billing, account, coverage, or phone questions..</p>
                <p>
                    {{--<a href="#about" class="btn btn-primary btn-xl page-scroll">Most popular question</a>--}}
                    <a href="auth/login" class="btn btn-xl btn-info">Log In</a>
                </p>
                <div class="row">
                    <p>
                        Don't Have an Account?
                        <a href="auth/register">Register.</a>
                    </p>
                </div>
            </div>
        </div>
    </header>
@stop

