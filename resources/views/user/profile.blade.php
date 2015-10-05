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
                    <h1 style="text-align: center">Data profile</h1>
                    <div class="row">
                        <p>
                            <b>Your name: </b>
                            {{$user['name']}}
                        </p>
                        @if($user['role'])
                            <p>
                                <b>Role:</b>
                                {{$user['role']}}
                            </p>
                        @endif
                        <p>
                            <b>Your email:</b>
                            {{$user['email']}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    @include('layouts.footer')
@endsection

