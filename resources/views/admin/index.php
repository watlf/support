<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <title>Admin panel <?= config('app.logo')?></title>
    <meta name="csrf-token" content="<?=csrf_token()?>">
    <link rel="stylesheet" href="/css/admin.css">
    <link rel="stylesheet" href="/css/all.css">
    <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
</head>
<body>
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li>
                <a href="<?= url('/')?>">
                    <span class="fa-stack fa-lg pull-left"><i class="glyphicon glyphicon-home"></i></span>Site
                </a>
            </li>
            <li ui-sref-active="active">
                <a ui-sref="questions({})">
                    <span class="fa-stack fa-lg pull-left"><i class="glyphicon glyphicon-th-list"></i></span>Questions
                </a>
            </li>
            <li ui-sref-active="active">
                <a ui-sref="countriesList({})">
                    <span class="fa-stack fa-lg pull-left"><i class="glyphicon glyphicon-th-list"></i></span>Countries
                </a>
            </li>
            <li ui-sref-active="active">
                <a ui-sref="usersList({})">
                    <span class="fa-stack fa-lg pull-left"><i class="glyphicon glyphicon-th-list"></i></span>Users
                </a>
            </li>
        </ul>
    </div>
    <div id="page-content-wrapper">
        <div class="container-fluid xyz">
            <div ui-view="main" class="col-sm-9 col-md-12 main" style="padding-left: 21%;">

            </div>
        </div>
    </div>
    <script src="/assets/admin/js/admin.js"></script>
    <script src="/assets/admin/js/app.js"></script>
</body>
</html>