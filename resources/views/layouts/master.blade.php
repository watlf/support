<!DOCTYPE html>
<html>
    <head>
        <title>{{config('app.logo')}} @yield('title')</title>
        <!-- Custom Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="/css/site.css">
        <link rel="stylesheet" type="text/css" href="/css/all.css">
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
        <script src="/js/site.js"></script>
        <script src="/js/all.js"></script>
    </head>
    <body id="page-top">
        @yield('content')
    </body>
</html>