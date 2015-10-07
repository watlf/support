<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <title>Admin panel <?= config('app.logo')?></title>
    <meta name="csrf-token" content="<?=csrf_token()?>">
    <link rel="stylesheet" href="/assets/admin/css/admin.css">
    <link rel="stylesheet" href="/css/all.css">
    <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
</head>
<body>
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li>
                <a href="<?= url('/')?>"><span class="fa-stack fa-lg pull-left"><i class="glyphicon-home"></i></span>Site</a>
            </li>
            <li>
                <a ui-sref="questions"><span class="fa-stack fa-lg pull-left"><i class="fa fa-youtube-play fa-stack-1x "></i></span>Questions</a>
            </li>
            <li>
                <a ui-sref="countries"><span class="fa-stack fa-lg pull-left"><i class="fa fa-wrench fa-stack-1x "></i></span>Countries</a>
            </li>
            <li>
                <a ui-sref="users"><span class="fa-stack fa-lg pull-left"><i class="fa fa-server fa-stack-1x "></i></span>Users</a>
            </li>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid xyz">
            <div ui-view="main" class="col-sm-9 col-sm-offset-4 col-md-10 col-md-offset-3 main">

            </div>
        </div>
    </div>
    <script src="/assets/admin/js/admin.js"></script>
    <script src="/assets/admin/js/app.js"></script>
</body>
</html>