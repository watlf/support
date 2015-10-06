@extends('layouts.master')

@section('title', 'User profile')

@section('content')
    <div id="wrapper">
        @include('user.sidebar')
        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid xyz">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Your question list</h1>
                        <div class="row">
                            <ul class="list-group">
                                @foreach($questions as $question)
                                    <li class="list-group-item" style="margin-bottom: 10px;">
                                        <p>
                                            <b>Theme: </b>
                                            {{$question->theme}}
                                        </p>
                                        <p>
                                            <b>Question: </b>
                                            <i>{{$question->text}}</i>
                                        </p>
                                        <p>
                                        @if($question->ansver)
                                            <b>Answer: </b><br>
                                            {{$question->ansver}}
                                        @else
                                            <span class="text-danger">In your question there is no answer yet.</span>
                                        @endif
                                        </p>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        {!! $questions->render() !!}
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    @include('layouts.footer')
@stop

