(function(){
    "use strict";

    angular.module('app.router').config(function($stateProvider, $urlRouterProvider) {

        var view = function (template) {
            return '/assets/admin/views/app/' + template + '/index.html';
        };

        $urlRouterProvider.otherwise('/users');

        $stateProvider
            .state('users', {
                url:'/users',
                views: {
                    main: {
                        controller:'UsersController',
                        templateUrl: view('user')
                    }
                }
            })
            .state('countries', {
                url:'/countries',
                views:{
                    main: {
                        //controller:'CountriesController',
                        templateUrl:view('countries')
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
})();