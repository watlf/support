'use strict';

var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', {
        templateUrl: 'start/start.html',
        controller: 'UsersController'
    });
}]);