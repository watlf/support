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

    angular.module('app.controller').controller('CountriesController', ["$scope", "Countries", "ngTableParams", "$location", "Restangular", function($scope, Countries, ngTableParams, $location, Restangular) {

        console.log(Countries);

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
                data = country.plain();
            }).catch(function(error) {
                errors.country = _.get(error, ['data', 'name', 0], '');
                $scope.errors = errors;
            });
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

    angular.module('app.controller').controller('UsersController', ["$scope", "Users", "ngTableParams", "$location", "Restangular", function($scope, Users, ngTableParams, $location, Restangular) {

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
                data = user.plain();
            }).catch(function(error){
                errors.email = _.get(error, ['data', 'email', 0], '');
                errors.name  = _.get(error, ['data', 'name', 0], '');
                $scope.errors = errors;
            });
        };

        $scope.delete = function (user,$data,$index) {
            user.remove().then(function (data) {
                $data.splice($index, 1);
            });
        };
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlLmpzIiwiYXBwL3NldHRpbmdzLmpzIiwiYXBwL2NvdW50cmllcy9pbmRleC5qcyIsImFwcC9xdWVzdGlvbnMvaW5kZXguanMiLCJhcHAvdXNlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgICAgICd1aS5yb3V0ZXInLFxuICAgICAgICAndWkuc29ydGFibGUnLFxuICAgICAgICAnYXBwLnJvdXRlcicsXG4gICAgICAgICdhcHAuY29udHJvbGxlcicsXG4gICAgICAgICdhcHAuY29uZmlnJ1xuICAgIF0pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXInLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInLCBbJ3Jlc3Rhbmd1bGFyJywgJ25nVGFibGUnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcicpLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAgICAgdmFyIHZpZXcgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAnL2Fzc2V0cy9hZG1pbi92aWV3cy9hcHAvJyArIHRlbXBsYXRlICsgJy9pbmRleC5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvdXNlcnMnKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCd1c2Vyc0xpc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvdXNlcnMnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J1VzZXJzQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogdmlldygndXNlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgVXNlcnM6IGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIuYWxsKCd1c2VycycpLmdldExpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ2NvdW50cmllc0xpc3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvY291bnRyaWVzJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6J0NvdW50cmllc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6dmlldygnY291bnRyaWVzJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBDb3VudHJpZXM6IGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIuYWxsKCdjb3VudHJpZXMnKS5nZXRMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdxdWVzdGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvcXVlc3Rpb25zJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgIG1haW46e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonUXVlc3Rpb25zQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogdmlldygncXVlc3Rpb25zJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1dKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlclxuICAgICAgICAgICAgLnNldEJhc2VVcmwoJy9hZG1pbi8nKVxuICAgICAgICAgICAgLnNldERlZmF1bHRIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nY3NyZi10b2tlbiddXCIpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNldFBhcmVudGxlc3ModHJ1ZSk7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGZ1bmN0aW9uKGRhdGEsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgZGVmZXJyZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdSZXNwb25zZTtcbiAgICAgICAgICAgIHN3aXRjaCAod2hhdCArICc6JyArIG9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJzOmdldExpc3QnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvdW50cmllczpnZXRMaXN0JzpcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVzcG9uc2UgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Jlc3BvbnNlLm1ldGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVzcG9uc2UgPSBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3UmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcicpLmNvbnRyb2xsZXIoJ0NvdW50cmllc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIENvdW50cmllcywgbmdUYWJsZVBhcmFtcywgJGxvY2F0aW9uLCBSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKENvdW50cmllcyk7XG5cbiAgICAgICAgdmFyIFRhYmxlID0gbmdUYWJsZVBhcmFtcztcbiAgICAgICAgJHNjb3BlLmNvdW50cmllcyA9IENvdW50cmllcztcblxuXG5cbiAgICAgICAgdmFyIHBhZ2UgPSBfLmdldCgkbG9jYXRpb24uc2VhcmNoKCksICdwYWdlJywgMSk7XG4gICAgICAgIHZhciBjb3VudCA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ2NvdW50JywgMTApO1xuICAgICAgICB2YXIgZXJyb3JzID0ge307XG5cbiAgICAgICAgJHNjb3BlLnRhYmxlUGFyYW1zID0gbmV3IFRhYmxlKHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsICAgICAgICAgICAgLy8gc2hvdyBmaXJzdCBwYWdlXG4gICAgICAgICAgICBjb3VudDogY291bnQgICAgICAgICAgIC8vIGNvdW50IHBlciBwYWdlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvdW50czogZmFsc2UsXG4gICAgICAgICAgICB0b3RhbDogQ291bnRyaWVzLm1ldGEudG90YWwsIC8vIGxlbmd0aCBvZiBkYXRhXG4gICAgICAgICAgICBnZXREYXRhOiBmdW5jdGlvbiAoJGRlZmVyLCBwYXJhbXMpIHtcblxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5zZWFyY2gocGFyYW1zLnVybCgpKTsgLy8gcHV0IHBhcmFtcyBpbiB1cmxcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBSZXN0YW5ndWxhci5hbGwoJ2NvdW50cmllcycpLmdldExpc3Qoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYXJhbXMucGFnZSgpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZWRpdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLnNhdmUoKS50aGVuKGZ1bmN0aW9uKGNvdW50cnkpIHtcbiAgICAgICAgICAgICAgICBkYXRhLiRlZGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBjb3VudHJ5LnBsYWluKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9ycy5jb3VudHJ5ID0gXy5nZXQoZXJyb3IsIFsnZGF0YScsICduYW1lJywgMF0sICcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignUXVlc3Rpb25zQ29udHJvbGxlcicsIGZ1bmN0aW9uKCAkc2NvcGUpIHtcblxuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcicpLmNvbnRyb2xsZXIoJ1VzZXJzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgVXNlcnMsIG5nVGFibGVQYXJhbXMsICRsb2NhdGlvbiwgUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICB2YXIgVGFibGUgPSBuZ1RhYmxlUGFyYW1zO1xuICAgICAgICB2YXIgcGFnZSA9IF8uZ2V0KCRsb2NhdGlvbi5zZWFyY2goKSwgJ3BhZ2UnLCAxKTtcbiAgICAgICAgdmFyIGNvdW50ID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAnY291bnQnLCAxMCk7XG4gICAgICAgIHZhciBlcnJvcnMgPSB7fTtcblxuICAgICAgICAkc2NvcGUudXNlcnMgPSBVc2VycztcbiAgICAgICAgJHNjb3BlLiRlZGl0ID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5lcnJvcnMgPSBmYWxzZTtcblxuXG4gICAgICAgICRzY29wZS50YWJsZVBhcmFtcyA9IG5ldyBUYWJsZSh7XG4gICAgICAgICAgICBwYWdlOiBwYWdlLCAgICAgICAgICAgIC8vIHNob3cgZmlyc3QgcGFnZVxuICAgICAgICAgICAgY291bnQ6IGNvdW50ICAgICAgICAgICAvLyBjb3VudCBwZXIgcGFnZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjb3VudHM6IGZhbHNlLFxuICAgICAgICAgICAgdG90YWw6IFVzZXJzLm1ldGEudG90YWwsIC8vIGxlbmd0aCBvZiBkYXRhXG4gICAgICAgICAgICBnZXREYXRhOiBmdW5jdGlvbiAoJGRlZmVyLCBwYXJhbXMpIHtcblxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5zZWFyY2gocGFyYW1zLnVybCgpKTsgLy8gcHV0IHBhcmFtcyBpbiB1cmxcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBSZXN0YW5ndWxhci5hbGwoJ3VzZXJzJykuZ2V0TGlzdCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IHBhcmFtcy5wYWdlKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5lZGl0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuc2F2ZSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgICAgICAgICAgIGRhdGEuJGVkaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdXNlci5wbGFpbigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGVycm9ycy5lbWFpbCA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnZW1haWwnLCAwXSwgJycpO1xuICAgICAgICAgICAgICAgIGVycm9ycy5uYW1lICA9IF8uZ2V0KGVycm9yLCBbJ2RhdGEnLCAnbmFtZScsIDBdLCAnJyk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5kZWxldGUgPSBmdW5jdGlvbiAodXNlciwkZGF0YSwkaW5kZXgpIHtcbiAgICAgICAgICAgIHVzZXIucmVtb3ZlKCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICRkYXRhLnNwbGljZSgkaW5kZXgsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9