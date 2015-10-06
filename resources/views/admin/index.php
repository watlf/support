<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>My AngularJS App</title>
    <meta name="description" content="">
    <meta name="csrf-token" content="<?=csrf_token()?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/app.css">
    <base href="/assets/admin/">
</head>
<body>
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li>
                <a ui-sref="questions({})"><span class="fa-stack fa-lg pull-left"><i class="fa fa-youtube-play fa-stack-1x "></i></span>Questions</a>
            </li>
            <li>
                <a ui-sref="countries({})"><span class="fa-stack fa-lg pull-left"><i class="fa fa-wrench fa-stack-1x "></i></span>Countries</a>
            </li>
            <li>
                <a ui-sref="users({})"><span class="fa-stack fa-lg pull-left"><i class="fa fa-server fa-stack-1x "></i></span>Users</a>
            </li>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid xyz">
            <div ui-view="main" class="col-sm-9 col-sm-offset-4 col-md-10 col-md-offset-2 main">

            </div>
        </div>
    </div>
    <script src="/assets/admin/js/angular.js"></script>
    <script src="/assets/admin/js/all.js"></script>
</body>
</html>