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
                url:'/questions',
                views:{
                    main:{
                        controller:'QuestionsController',
                        templateUrl: view('questions')
                    }
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

    angular.module('app.controller').controller('QuestionsController', ["$scope", function( $scope) {

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
            counts: false,
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
            });
        };
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlLmpzIiwiYXBwL3NldHRpbmdzLmpzIiwiYXBwL2NvdW50cmllcy9pbmRleC5qcyIsImFwcC9xdWVzdGlvbnMvaW5kZXguanMiLCJhcHAvdXNlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICAgICAndWkucm91dGVyJyxcbiAgICAgICAgJ3VpLnNvcnRhYmxlJyxcbiAgICAgICAgJ2FwcC5yb3V0ZXInLFxuICAgICAgICAnYXBwLmNvbnRyb2xsZXInLFxuICAgICAgICAnYXBwLmNvbmZpZydcbiAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVyJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJywgWydyZXN0YW5ndWxhcicsICduZ1RhYmxlJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXInKS5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgIHZhciB2aWV3ID0gZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJy9hc3NldHMvYWRtaW4vdmlld3MvYXBwLycgKyB0ZW1wbGF0ZSArICcvaW5kZXguaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3VzZXJzJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgndXNlcnNMaXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL3VzZXJzJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOidVc2Vyc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXcoJ3VzZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIFVzZXJzOiBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLmFsbCgndXNlcnMnKS5nZXRMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdjb3VudHJpZXNMaXN0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL2NvdW50cmllcycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOidDb3VudHJpZXNDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOnZpZXcoJ2NvdW50cmllcycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgQ291bnRyaWVzOiBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLmFsbCgnY291bnRyaWVzJykuZ2V0TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgncXVlc3Rpb25zJywge1xuICAgICAgICAgICAgICAgIHVybDonL3F1ZXN0aW9ucycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICBtYWluOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J1F1ZXN0aW9uc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXcoJ3F1ZXN0aW9ucycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnKS5jb25maWcoZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xuXG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXJcbiAgICAgICAgICAgIC5zZXRCYXNlVXJsKCcvYWRtaW4vJylcbiAgICAgICAgICAgIC5zZXREZWZhdWx0SGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ1gtQ1NSRi1UT0tFTic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J2NzcmYtdG9rZW4nXVwiKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zZXRQYXJlbnRsZXNzKHRydWUpO1xuXG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihmdW5jdGlvbihkYXRhLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIGRlZmVycmVkKSB7XG4gICAgICAgICAgICB2YXIgbmV3UmVzcG9uc2U7XG4gICAgICAgICAgICBzd2l0Y2ggKHdoYXQgKyAnOicgKyBvcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyczpnZXRMaXN0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdjb3VudHJpZXM6Z2V0TGlzdCc6XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBuZXdSZXNwb25zZS5tZXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlID0gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1Jlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdDb3VudHJpZXNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBDb3VudHJpZXMsIG5nVGFibGVQYXJhbXMsICRsb2NhdGlvbiwgUmVzdGFuZ3VsYXIsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgdmFyIFRhYmxlID0gbmdUYWJsZVBhcmFtcztcbiAgICAgICAgJHNjb3BlLmNvdW50cmllcyA9IENvdW50cmllcztcblxuICAgICAgICB2YXIgcGFnZSA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ3BhZ2UnLCAxKTtcbiAgICAgICAgdmFyIGNvdW50ID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAnY291bnQnLCAxMCk7XG4gICAgICAgIHZhciBlcnJvcnMgPSB7fTtcblxuICAgICAgICAkc2NvcGUudGFibGVQYXJhbXMgPSBuZXcgVGFibGUoe1xuICAgICAgICAgICAgcGFnZTogcGFnZSwgICAgICAgICAgICAvLyBzaG93IGZpcnN0IHBhZ2VcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCAgICAgICAgICAgLy8gY291bnQgcGVyIHBhZ2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY291bnRzOiBmYWxzZSxcbiAgICAgICAgICAgIHRvdGFsOiBDb3VudHJpZXMubWV0YS50b3RhbCwgLy8gbGVuZ3RoIG9mIGRhdGFcbiAgICAgICAgICAgIGdldERhdGE6IGZ1bmN0aW9uICgkZGVmZXIsIHBhcmFtcykge1xuXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMudXJsKCkpOyAvLyBwdXQgcGFyYW1zIGluIHVybFxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFJlc3Rhbmd1bGFyLmFsbCgnY291bnRyaWVzJykuZ2V0TGlzdCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhcmFtcy5wYWdlKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lZGl0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuc2F2ZSgpLnRoZW4oZnVuY3Rpb24oY291bnRyeSkge1xuICAgICAgICAgICAgICAgIGRhdGEuJGVkaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRhID0gY291bnRyeS5wbGFpbigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMuY291bnRyeSA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLiRzdWNjZXNzID0gZmFsc2U7ICRzY29wZS5lcnJvcnMgPSBmYWxzZTt9LCA1MDAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYWRkID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXIuYWxsKCdjb3VudHJpZXMnKS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oY291bnRyeSkge1xuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZVBhcmFtcy5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBlcnJvcnMuY291bnRyeSA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLmVycm9ycyA9IGZhbHNlO30sIDUwMDApO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignUXVlc3Rpb25zQ29udHJvbGxlcicsIGZ1bmN0aW9uKCAkc2NvcGUpIHtcblxuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcicpLmNvbnRyb2xsZXIoJ1VzZXJzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgVXNlcnMsIG5nVGFibGVQYXJhbXMsICRsb2NhdGlvbiwgUmVzdGFuZ3VsYXIsICR0aW1lb3V0KSB7XG5cbiAgICAgICAgdmFyIFRhYmxlID0gbmdUYWJsZVBhcmFtcztcbiAgICAgICAgdmFyIHBhZ2UgPSBfLmdldCgkbG9jYXRpb24uc2VhcmNoKCksICdwYWdlJywgMSk7XG4gICAgICAgIHZhciBjb3VudCA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ2NvdW50JywgMTApO1xuICAgICAgICB2YXIgZXJyb3JzID0ge307XG5cbiAgICAgICAgJHNjb3BlLnVzZXJzID0gVXNlcnM7XG4gICAgICAgICRzY29wZS4kZWRpdCA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuZXJyb3JzID0gZmFsc2U7XG5cblxuICAgICAgICAkc2NvcGUudGFibGVQYXJhbXMgPSBuZXcgVGFibGUoe1xuICAgICAgICAgICAgcGFnZTogcGFnZSwgICAgICAgICAgICAvLyBzaG93IGZpcnN0IHBhZ2VcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCAgICAgICAgICAgLy8gY291bnQgcGVyIHBhZ2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY291bnRzOiBmYWxzZSxcbiAgICAgICAgICAgIHRvdGFsOiBVc2Vycy5tZXRhLnRvdGFsLCAvLyBsZW5ndGggb2YgZGF0YVxuICAgICAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24gKCRkZWZlciwgcGFyYW1zKSB7XG5cbiAgICAgICAgICAgICAgICAkbG9jYXRpb24uc2VhcmNoKHBhcmFtcy51cmwoKSk7IC8vIHB1dCBwYXJhbXMgaW4gdXJsXG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gUmVzdGFuZ3VsYXIuYWxsKCd1c2VycycpLmdldExpc3Qoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYXJhbXMucGFnZSgpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnNhdmUoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBkYXRhLiRlZGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdXNlci5wbGFpbigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGVycm9ycy5lbWFpbCA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnZW1haWwnLCAwXSwgJycpO1xuICAgICAgICAgICAgICAgIGVycm9ycy5uYW1lICA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZmFsc2U7XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuZGVsZXRlID0gZnVuY3Rpb24gKHVzZXIsJGRhdGEsJGluZGV4KSB7XG4gICAgICAgICAgICB1c2VyLnJlbW92ZSgpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkZGF0YS5zcGxpY2UoJGluZGV4LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==