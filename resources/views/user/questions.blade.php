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
                        <h1>Your question list</h1>
                        <div class="row">
                            <ul class="list-group">
                                <li class="list-group-item">First question</li>
                                <li class="list-group-item">Second question</li>
                                <li class="list-group-item">Third question</li>
                                <li class="list-group-item">Fourth question</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
    <!-- /#wrapper -->

    @include('layouts.footer')
@stop

