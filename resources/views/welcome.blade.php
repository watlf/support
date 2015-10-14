@extends('layouts.master')

@section('title', 'Support')

@section('content')
    @include('layouts.nav')
    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1>How may we help you?</h1>
                <hr>
                <p>Contact {{config('app.logo')}} Customer Service by phone, chat, or TTY. Our team is ready to help you with billing, account, coverage, or phone questions.</p>
                <p>
                    <a href="#popularity" class="btn btn-primary btn-lg page-scroll">Most popular question</a>
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
                    <div class="list-group all-questions">
                        @if(!$popularity)
                            <p>
                                We do not have popular items for your region. Perhaps you'll be time as the first.
                            </p>
                        @else
                            @foreach($popularity as $question)
                                <a href="#" onclick="return questionDetail({{$question->id}})" class="list-group-item ">
                                    <h4 class="list-group-item-heading text-left"><b>Theme:</b>{{$question->theme}}</h4>
                                    <p class="list-group-item-text text-left">{{$question->text}}</p>
                                </a>
                            @endforeach
                        @endif
                    </div>
                    <div>
                        <div style="float: left;">
                            <a href="#questions" class="btn btn-success btn-lg page-scroll">Questions list</a>
                        </div>
                        <div style="text-align: right">
                            <a href="#ask" class="btn btn-info btn-lg page-scroll">Ask a Question</a>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="questions" style="height: 100%">
        <div class="container">
            <div class="text-center">
                <h2>
                    All questions.
                </h2>
                <hr>
                <div class="list-group all-questions">
                    @foreach($questions as $question)
                        <a href="#" onclick="return questionDetail({{$question->id}})" class="list-group-item ">
                            <h4 class="list-group-item-heading text-left"><b>Theme:</b>{{$question->theme}}</h4>
                            <p class="list-group-item-text text-left">{{$question->text}}</p>
                        </a>
                    @endforeach
                </div>
                <div>
                    <div style="float: left;">{!! $questions->fragment('questions')->render() !!}</div>
                    <div style="text-align: right">
                        <a href="#ask" class="btn btn-info btn-lg page-scroll" style="margin: 20px 0;">Ask a Question</a>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
    </section>

    <section id="ask" style="height: 100%">
        <div class="container">
            <div class="row">
                <div class="text-center">
                    <div class="alert alert-success" style="display: none;">
                        <p>
                            <strong>Thanks for your question!</strong>
                            We will reply you as soon as possible.
                        </p>
                    </div>
                    <h2>
                        Ask a Question.
                    </h2>
                    <hr>
                    <div class="row">
                        <div class="col-lg-8 col-lg-offset-2 text-center">
                            <form id="formAskQuestion" method="post" action="ask/{{Auth::user()->getAttribute('id')}}">
                                {!! csrf_field() !!}
                                <div class="form-group input-wrapper" data-name="theme">
                                    <label for="inputTheme" class="sr-only">Theme</label>
                                    <input type="text" class="form-control" placeholder="Theme name" required="" name="theme" value="{{ old('theme') }}">
                                    <span class="error-block">{{$errors->first('theme')}}</span>
                                </div>
                                <div class="form-group input-wrapper" data-name="text">
                                    <label for="inputEmail" class="sr-only">Text</label>
                                    <textarea rows="10" class="form-control" placeholder="Your question" required="" name="text">{{ old('text') }}</textarea>
                                    <span class="error-block">{{$errors->first('text')}}</span>
                                </div>
                                <div class="form-group input-wrapper" data-name="g-recaptcha-response">
                                    @include('layouts.captcha')
                                    <span class="error-block">{{$errors->first('g-recaptcha-response')}}</span>
                                </div>
                                <button class="btn btn-success btn-lg" type="submit">Send a question</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Modal -->
    <div id="questionModal" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="font-weight: bold"></h4>
                </div>
                <div class="modal-body">
                    <p><b>Question:</b></p>
                    <p class="modal-question" style="word-wrap: break-word"></p>
                    <p><b>Answer:</b></p>
                    <p class="modal-answer" style="word-wrap: break-word"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    @include('layouts.footer')
@endsection

