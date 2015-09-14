@extends('layouts.master')

@section('title', 'T-Mobile support')

@section('content')
    @include('layouts.nav')
    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1>How may we help you?</h1>
                <hr>
                <p>Contact T-Mobile Customer Service by phone, chat, or TTY. Our team is ready to help you with billing, account, coverage, or phone questions.</p>
                <p>
                    <a href="#popularity" class="btn btn-primary btn-xl page-scroll">Most popular question</a>
                </p>
            </div>
        </div>
    </header>

    <section id="popularity" style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2>
                        Most popularity questions.
                    </h2>
                    <hr>
                    <p>
                        <a href="#ask" class="btn btn-info btn-xl page-scroll">Ask a Question</a>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="ask" style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    @if(Session::get('status'))
                        <div class="alert alert-success">
                            <p>
                                <strong>Thanks for your question!</strong>
                                We will reply you as soon as possible.
                            </p>
                        </div>
                    @endif
                    <h2>
                        Ask a Question.
                    </h2>
                    <hr>
                    <div class="row">
                        <div class="col-lg-8 col-lg-offset-2 text-center">
                            <form method="post" action="ask/{{Auth::user()->getAttribute('id')}}">
                                {!! csrf_field() !!}
                                <div class="form-group input-wrapper" data-name="theme">
                                    <label for="inputTheme" class="sr-only">Theme</label>
                                    <input type="text" class="form-control" placeholder="Theme name" required="" name="theme" value="{{ old('theme') }}">
                                    <span class="text-danger">{{$errors->first('theme')}}</span>
                                </div>
                                <div class="form-group input-wrapper" data-name="text">
                                    <label for="inputEmail" class="sr-only">Text</label>
                                    <textarea rows="10" class="form-control" placeholder="Your question" required="" name="text">{{ old('text') }}</textarea>
                                    <span class="text-danger">{{$errors->first('text')}}</span>
                                </div>
                                <button class="btn btn-lx btn-success" type="submit">Send a question</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@stop

@include('layouts.footer')