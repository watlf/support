(function(){
    "use strict";

    var app = angular.module('app', [
        'ui.router',
        'ui.sortable',
        'app.router',
        'app.controller',
        'app.config'
    ]);

    angular.module('app.router', ['ui.router']);
    angular.module('app.controller', ['restangular', 'ngTable']);
    angular.module('app.config', []);

})();
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
                    Users: ["Restangular", function(Restangular) {
                        return Restangular.all('users').getList();
                    }]
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
                    Countries: ["Restangular", function(Restangular) {
                        return Restangular.all('countries').getList();
                    }]
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
                    Questions: ["Restangular", function(Restangular) {
                        return Restangular.all('questions').getList();
                    }]
                }
            })
            .state('questions.edit', {
                url:'/questions/:id',
                controller: 'QuestionsEditController',
                templateUrl: '/assets/admin/views/app/questions/questions.edit.html',
                resolve: {
                    Question: ["Restangular", "$stateParams", function(Restangular, $stateParams) {
                        return Restangular.one('questions', $stateParams.id).get();
                    }]
                }
            });
    }]);
})();
(function(){
    "use strict";

    angular.module('app.config').config(["RestangularProvider", function(RestangularProvider) {

        RestangularProvider
            .setBaseUrl('/admin/')
            .setDefaultHeaders({
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content')
            })
            .setParentless(true);

        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var newResponse;
            switch (what + ':' + operation) {
                case 'users:getList':
                case 'countries:getList':
                case 'questions:getList':
                    newResponse = data.data;
                    newResponse.meta = data;
                    break;
                default :
                    newResponse = data;
            }

            return newResponse;
        });
    }]);
})();
(function(){
    "use strict";

    angular.module('app.controller').controller('CountriesController', ["$scope", "Countries", "ngTableParams", "$location", "Restangular", "$timeout", function($scope, Countries, ngTableParams, $location, Restangular, $timeout) {

        var Table = ngTableParams;
        $scope.countries = Countries;

        var page = _.get($location.search(), 'page', 1);
        var count = _.get($location.search(), 'count', 10);
        var errors = {};

        $scope.tableParams = new Table({
            page: page,            // show first page
            count: count           // count per page
        }, {
            counts: false,
            total: Countries.meta.total, // length of data
            getData: function ($defer, params) {

                $location.search(params.url()); // put params in url

                var result = Restangular.all('countries').getList({
                    page: params.page()
                });

                $defer.resolve(result);
            }
        });

        $scope.edit = function (data) {
            data.save().then(function(country) {
                data.$edit = false;
                $scope.errors = false;
                $scope.$success = true;
                data = country.plain();
            }).catch(function(error) {
                errors.country = _.get(error, ['data', 'name', 0], 'Something went wrong.');
                $scope.errors = errors;
                $scope.$success = false;
            });

            $timeout(function() { $scope.$success = false; $scope.errors = false;}, 5000);
        };

        $scope.add = function(data) {
            Restangular.all('countries').post(data).then(function(country) {
                $scope.tableParams.reload();
            }).catch(function(error){
                errors.country = _.get(error, ['data', 'name', 0], 'Something went wrong.');
                $scope.errors = errors;
                $scope.$success = false;
            });

            $timeout(function() { $scope.errors = false;}, 5000);
        };

    }]);
})();
(function(){
    "use strict";

    angular.module('app.controller').controller('QuestionsEditController', ["$scope", "Question", "$timeout", function( $scope, Question, $timeout) {
        $scope.question = Question;

        $scope.answerTheQuestion = function(data) {
            var message = {};

            data.save().then(function(question){
                $scope.question = question;
                message.success = 'Data successfully updated';
            }).catch(function(error) {

                message.error = _.get(error, ['data', 'theme'], ' ');
                message.error += _.get(error, ['data', 'text'], ' ');
                message.error += _.get(error, ['data', 'answer'], ' ');
            });

            $scope.message = message;

            $timeout(function(){ $scope.message = {}; }, 5000);
        };
    }]);
})();
(function(){
    "use strict";

    angular.module('app.controller').controller('QuestionsListController', ["$scope", "$state", "Questions", "ngTableParams", "$location", "Restangular", function( $scope, $state, Questions, ngTableParams, $location, Restangular) {
        var Table = ngTableParams;

        var urlParams = {};

        urlParams.page = _.get($location.search(), 'page', 1);
        urlParams.count = _.get($location.search(), 'count', 10);
        var errors = {};

        $scope.tableParams = new Table(urlParams,{
            counts:false,
            total: Questions.meta.total,
            getData: function($defer, params){
                $location.search(params.url());

                $defer.resolve(
                    Restangular.all('questions').getList({
                      page:params.page()
                    })
                );
            }
        });

        $scope.edit = function(question) {
          $state.go('questions.edit', {id:question.id});
        };
    }]);
})();
(function(){
    "use strict";

    angular.module('app.controller').controller('UsersController', ["$scope", "Users", "ngTableParams", "$location", "Restangular", "$timeout", function($scope, Users, ngTableParams, $location, Restangular, $timeout) {

        var Table = ngTableParams;
        var page = _.get($location.search(), 'page', 1);
        var count = _.get($location.search(), 'count', 10);
        var errors = {};

        $scope.users = Users;
        $scope.$edit = false;
        $scope.errors = false;


        $scope.tableParams = new Table({
            page: page,            // show first page
            count: count           // count per page
        }, {
            counts: false, // edit count per page
            total: Users.meta.total, // length of data
            getData: function ($defer, params) {

                $location.search(params.url()); // put params in url

                var result = Restangular.all('users').getList({
                    page: params.page()
                });

                $defer.resolve(result);
            }
        });

        $scope.edit = function(data) {
                data.save().then(function(user) {
                data.$edit = false;
                $scope.$success = true;
                data = user.plain();
            }).catch(function(error){
                errors.email = _.get(error, ['data', 'email', 0], '');
                errors.name  = _.get(error, ['data', 'name', 0], '');
                $scope.errors = errors;
                $scope.$success = false;
            });

            $timeout(function (){
                $scope.$success = false;
                $scope.errors = false;
            }, 5000);
        };

        $scope.delete = function (user,$data,$index) {
            user.remove().then(function (data) {
                $data.splice($index, 1);
            }).catch(function(error){
                errors.name  = _.get(error, ['data', 'name', 0], '');
                $scope.errors = errors;
            });
        };
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlLmpzIiwiYXBwL3NldHRpbmdzLmpzIiwiYXBwL2NvdW50cmllcy9pbmRleC5qcyIsImFwcC9xdWVzdGlvbnMvcXVlc3Rpb25zLmVkaXQuanMiLCJhcHAvcXVlc3Rpb25zL3F1ZXN0aW9ucy5saXN0LmpzIiwiYXBwL3VzZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICd1aS5zb3J0YWJsZScsXG4gICAgICAgICdhcHAucm91dGVyJyxcbiAgICAgICAgJ2FwcC5jb250cm9sbGVyJyxcbiAgICAgICAgJ2FwcC5jb25maWcnXG4gICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcicsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcicsIFsncmVzdGFuZ3VsYXInLCAnbmdUYWJsZSddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVyJykuY29uZmlnKFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgdmlldyA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2FkbWluL3ZpZXdzL2FwcC8nICsgdGVtcGxhdGUgKyAnL2luZGV4Lmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy91c2VycycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3VzZXJzTGlzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy91c2VycycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonVXNlcnNDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiB2aWV3KCd1c2VyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBVc2VyczogZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5hbGwoJ3VzZXJzJykuZ2V0TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY291bnRyaWVzTGlzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy9jb3VudHJpZXMnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonQ291bnRyaWVzQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDp2aWV3KCdjb3VudHJpZXMnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIENvdW50cmllczogZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5hbGwoJ2NvdW50cmllcycpLmdldExpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC5zdGF0ZSgncXVlc3Rpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDonJyxcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgIG1haW46e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXcoJ3F1ZXN0aW9ucycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdxdWVzdGlvbnMubGlzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy9xdWVzdGlvbnMnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J1F1ZXN0aW9uc0xpc3RDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9hc3NldHMvYWRtaW4vdmlld3MvYXBwL3F1ZXN0aW9ucy9xdWVzdGlvbnMubGlzdC5odG1sJyxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIFF1ZXN0aW9uczogZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5hbGwoJ3F1ZXN0aW9ucycpLmdldExpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3F1ZXN0aW9ucy5lZGl0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL3F1ZXN0aW9ucy86aWQnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdRdWVzdGlvbnNFZGl0Q29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYXNzZXRzL2FkbWluL3ZpZXdzL2FwcC9xdWVzdGlvbnMvcXVlc3Rpb25zLmVkaXQuaHRtbCcsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBRdWVzdGlvbjogZnVuY3Rpb24oUmVzdGFuZ3VsYXIsICRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncXVlc3Rpb25zJywgJHN0YXRlUGFyYW1zLmlkKS5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1dKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlclxuICAgICAgICAgICAgLnNldEJhc2VVcmwoJy9hZG1pbi8nKVxuICAgICAgICAgICAgLnNldERlZmF1bHRIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nY3NyZi10b2tlbiddXCIpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNldFBhcmVudGxlc3ModHJ1ZSk7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGZ1bmN0aW9uKGRhdGEsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgZGVmZXJyZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdSZXNwb25zZTtcbiAgICAgICAgICAgIHN3aXRjaCAod2hhdCArICc6JyArIG9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJzOmdldExpc3QnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvdW50cmllczpnZXRMaXN0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdxdWVzdGlvbnM6Z2V0TGlzdCc6XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBuZXdSZXNwb25zZS5tZXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1Jlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdDb3VudHJpZXNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBDb3VudHJpZXMsIG5nVGFibGVQYXJhbXMsICRsb2NhdGlvbiwgUmVzdGFuZ3VsYXIsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgdmFyIFRhYmxlID0gbmdUYWJsZVBhcmFtcztcbiAgICAgICAgJHNjb3BlLmNvdW50cmllcyA9IENvdW50cmllcztcblxuICAgICAgICB2YXIgcGFnZSA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ3BhZ2UnLCAxKTtcbiAgICAgICAgdmFyIGNvdW50ID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAnY291bnQnLCAxMCk7XG4gICAgICAgIHZhciBlcnJvcnMgPSB7fTtcblxuICAgICAgICAkc2NvcGUudGFibGVQYXJhbXMgPSBuZXcgVGFibGUoe1xuICAgICAgICAgICAgcGFnZTogcGFnZSwgICAgICAgICAgICAvLyBzaG93IGZpcnN0IHBhZ2VcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCAgICAgICAgICAgLy8gY291bnQgcGVyIHBhZ2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY291bnRzOiBmYWxzZSxcbiAgICAgICAgICAgIHRvdGFsOiBDb3VudHJpZXMubWV0YS50b3RhbCwgLy8gbGVuZ3RoIG9mIGRhdGFcbiAgICAgICAgICAgIGdldERhdGE6IGZ1bmN0aW9uICgkZGVmZXIsIHBhcmFtcykge1xuXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMudXJsKCkpOyAvLyBwdXQgcGFyYW1zIGluIHVybFxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFJlc3Rhbmd1bGFyLmFsbCgnY291bnRyaWVzJykuZ2V0TGlzdCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhcmFtcy5wYWdlKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lZGl0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuc2F2ZSgpLnRoZW4oZnVuY3Rpb24oY291bnRyeSkge1xuICAgICAgICAgICAgICAgIGRhdGEuJGVkaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRhID0gY291bnRyeS5wbGFpbigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMuY291bnRyeSA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLiRzdWNjZXNzID0gZmFsc2U7ICRzY29wZS5lcnJvcnMgPSBmYWxzZTt9LCA1MDAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYWRkID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXIuYWxsKCdjb3VudHJpZXMnKS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oY291bnRyeSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZVBhcmFtcy5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBlcnJvcnMuY291bnRyeSA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLmVycm9ycyA9IGZhbHNlO30sIDUwMDApO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignUXVlc3Rpb25zRWRpdENvbnRyb2xsZXInLCBmdW5jdGlvbiggJHNjb3BlLCBRdWVzdGlvbiwgJHRpbWVvdXQpIHtcbiAgICAgICAgJHNjb3BlLnF1ZXN0aW9uID0gUXVlc3Rpb247XG5cbiAgICAgICAgJHNjb3BlLmFuc3dlclRoZVF1ZXN0aW9uID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB7fTtcblxuICAgICAgICAgICAgZGF0YS5zYXZlKCkudGhlbihmdW5jdGlvbihxdWVzdGlvbil7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnF1ZXN0aW9uID0gcXVlc3Rpb247XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzID0gJ0RhdGEgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQnO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZXJyb3IgPSBfLmdldChlcnJvciwgWydkYXRhJywgJ3RoZW1lJ10sICcgJyk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5lcnJvciArPSBfLmdldChlcnJvciwgWydkYXRhJywgJ3RleHQnXSwgJyAnKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmVycm9yICs9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnYW5zd2VyJ10sICcgJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpeyAkc2NvcGUubWVzc2FnZSA9IHt9OyB9LCA1MDAwKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdRdWVzdGlvbnNMaXN0Q29udHJvbGxlcicsIGZ1bmN0aW9uKCAkc2NvcGUsICRzdGF0ZSwgUXVlc3Rpb25zLCBuZ1RhYmxlUGFyYW1zLCAkbG9jYXRpb24sIFJlc3Rhbmd1bGFyKSB7XG4gICAgICAgIHZhciBUYWJsZSA9IG5nVGFibGVQYXJhbXM7XG5cbiAgICAgICAgdmFyIHVybFBhcmFtcyA9IHt9O1xuXG4gICAgICAgIHVybFBhcmFtcy5wYWdlID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAncGFnZScsIDEpO1xuICAgICAgICB1cmxQYXJhbXMuY291bnQgPSBfLmdldCgkbG9jYXRpb24uc2VhcmNoKCksICdjb3VudCcsIDEwKTtcbiAgICAgICAgdmFyIGVycm9ycyA9IHt9O1xuXG4gICAgICAgICRzY29wZS50YWJsZVBhcmFtcyA9IG5ldyBUYWJsZSh1cmxQYXJhbXMse1xuICAgICAgICAgICAgY291bnRzOmZhbHNlLFxuICAgICAgICAgICAgdG90YWw6IFF1ZXN0aW9ucy5tZXRhLnRvdGFsLFxuICAgICAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oJGRlZmVyLCBwYXJhbXMpe1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5zZWFyY2gocGFyYW1zLnVybCgpKTtcblxuICAgICAgICAgICAgICAgICRkZWZlci5yZXNvbHZlKFxuICAgICAgICAgICAgICAgICAgICBSZXN0YW5ndWxhci5hbGwoJ3F1ZXN0aW9ucycpLmdldExpc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6cGFyYW1zLnBhZ2UoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lZGl0ID0gZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgICAgICAkc3RhdGUuZ28oJ3F1ZXN0aW9ucy5lZGl0Jywge2lkOnF1ZXN0aW9uLmlkfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignVXNlcnNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VycywgbmdUYWJsZVBhcmFtcywgJGxvY2F0aW9uLCBSZXN0YW5ndWxhciwgJHRpbWVvdXQpIHtcblxuICAgICAgICB2YXIgVGFibGUgPSBuZ1RhYmxlUGFyYW1zO1xuICAgICAgICB2YXIgcGFnZSA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ3BhZ2UnLCAxKTtcbiAgICAgICAgdmFyIGNvdW50ID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAnY291bnQnLCAxMCk7XG4gICAgICAgIHZhciBlcnJvcnMgPSB7fTtcblxuICAgICAgICAkc2NvcGUudXNlcnMgPSBVc2VycztcbiAgICAgICAgJHNjb3BlLiRlZGl0ID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5lcnJvcnMgPSBmYWxzZTtcblxuXG4gICAgICAgICRzY29wZS50YWJsZVBhcmFtcyA9IG5ldyBUYWJsZSh7XG4gICAgICAgICAgICBwYWdlOiBwYWdlLCAgICAgICAgICAgIC8vIHNob3cgZmlyc3QgcGFnZVxuICAgICAgICAgICAgY291bnQ6IGNvdW50ICAgICAgICAgICAvLyBjb3VudCBwZXIgcGFnZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb3VudHM6IGZhbHNlLCAvLyBlZGl0IGNvdW50IHBlciBwYWdlXG4gICAgICAgICAgICB0b3RhbDogVXNlcnMubWV0YS50b3RhbCwgLy8gbGVuZ3RoIG9mIGRhdGFcbiAgICAgICAgICAgIGdldERhdGE6IGZ1bmN0aW9uICgkZGVmZXIsIHBhcmFtcykge1xuXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMudXJsKCkpOyAvLyBwdXQgcGFyYW1zIGluIHVybFxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFJlc3Rhbmd1bGFyLmFsbCgndXNlcnMnKS5nZXRMaXN0KHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogcGFyYW1zLnBhZ2UoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVkaXQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5zYXZlKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0YS4kZWRpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzY29wZS4kc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHVzZXIucGxhaW4oKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBlcnJvcnMuZW1haWwgPSBfLmdldChlcnJvciwgWydkYXRhJywgJ2VtYWlsJywgMF0sICcnKTtcbiAgICAgICAgICAgICAgICBlcnJvcnMubmFtZSAgPSBfLmdldChlcnJvciwgWydkYXRhJywgJ25hbWUnLCAwXSwgJycpO1xuICAgICAgICAgICAgICAgICRzY29wZS5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZSA9IGZ1bmN0aW9uICh1c2VyLCRkYXRhLCRpbmRleCkge1xuICAgICAgICAgICAgdXNlci5yZW1vdmUoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJGRhdGEuc3BsaWNlKCRpbmRleCwgMSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgZXJyb3JzLm5hbWUgID0gXy5nZXQoZXJyb3IsIFsnZGF0YScsICduYW1lJywgMF0sICcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9