//(function(){
    "use strict";
    var app = angular.module('app', ['ngRoute', 'ui.router']);

    app.config(function( $urlRouterProvider, $stateProvider) {

        var view = function (template) {
            return 'views/' + template + '/index.html';
        };

        $urlRouterProvider.otherwise('users');

        $stateProvider
            .state('countries', {
                url:'/countries',
                views:{
                    main: {
                        //controller:'CountriesController',
                        templateUrl:view('countries')
                    }
                }
            })
            .state('users', {
                url:'/users',
                views: {
                    main: {
                       // controller:'UsersController',
                        templateUrl: view('user')
                    }
                }
            })
            .state('questions', {
                url:'/questions',
                views:{
                    main:{
                        //controller:'QuestionsController',
                        templateUrl: view('questions')
                    }
                }
            });
    });
//});