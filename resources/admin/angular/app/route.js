(function(){
    "use strict";

    angular.module('app.router').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        var view = function (template) {
            return '/assets/admin/views/app/' + template + '/index.html';
        };

        $urlRouterProvider.otherwise('/users');

        $stateProvider
            .state('usersList', {
                url:'/users',
                views: {
                    main: {
                        controller:'UsersController',
                        templateUrl: view('user')
                    }
                },
                resolve: {
                    Users: function(Restangular) {
                        return Restangular.all('users').getList();
                    }
                }
            })
            .state('countriesList', {
                url:'/countries',
                views:{
                    main: {
                        controller:'CountriesController',
                        templateUrl:view('countries')
                    }
                },
                resolve: {
                    Countries: function(Restangular) {
                        return Restangular.all('countries').getList();
                    }
                }
            })

            .state('questions', {
                url:'',
                abstract: true,
                views:{
                    main:{
                        templateUrl: view('questions')
                    }
                }
            })
            .state('questions.list', {
                url:'/questions',
                controller:'QuestionsListController',
                templateUrl: '/assets/admin/views/app/questions/questions.list.html',
                resolve: {
                    Questions: function(Restangular) {
                        return Restangular.all('questions').getList();
                    }
                }
            })
            .state('questions.edit', {
                url:'/questions/:id',
                controller: 'QuestionsEditController',
                templateUrl: '/assets/admin/views/app/questions/questions.edit.html',
                resolve: {
                    Question: function(Restangular, $stateParams) {
                        return Restangular.one('questions', $stateParams.id).get();
                    }
                }
            });
    }]);
})();