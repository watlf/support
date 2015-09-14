@extends('layouts.master')

@section('title', 'T-Mobile user profile')

@section('content')
    <div id="wrapper">
    @include('user.sidebar')
    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid xyz">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Data profile</h1>
                    <div class="row">
                        <p>Volume-down icon: <span class="glyphicon glyphicon-volume-down"></span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

@stop

@include('layouts.footer')
