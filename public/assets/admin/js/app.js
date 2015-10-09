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
            .state('countries', {
                url:'/countries',
                views:{
                    main: {
                        controller:'CountriesController',
                        templateUrl:view('countries')
                    }
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

    angular.module('app.controller').controller('CountriesController', ["$scope", function( $scope){

    }]);
})();
(function(){
    "use strict";

    angular.module('app.controller').controller('QuestionsController', ["$scope", function( $scope){

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlLmpzIiwiYXBwL3NldHRpbmdzLmpzIiwiYXBwL2NvdW50cmllcy9pbmRleC5qcyIsImFwcC9xdWVzdGlvbnMvaW5kZXguanMiLCJhcHAvdXNlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICd1aS5zb3J0YWJsZScsXG4gICAgICAgICdhcHAucm91dGVyJyxcbiAgICAgICAgJ2FwcC5jb250cm9sbGVyJyxcbiAgICAgICAgJ2FwcC5jb25maWcnXG4gICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcicsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcicsIFsncmVzdGFuZ3VsYXInLCAnbmdUYWJsZSddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVyJykuY29uZmlnKFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgdmlldyA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2FkbWluL3ZpZXdzL2FwcC8nICsgdGVtcGxhdGUgKyAnL2luZGV4Lmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy91c2VycycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3VzZXJzTGlzdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy91c2VycycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonVXNlcnNDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiB2aWV3KCd1c2VyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBVc2VyczogZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5hbGwoJ3VzZXJzJykuZ2V0TGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY291bnRyaWVzJywge1xuICAgICAgICAgICAgICAgIHVybDonL2NvdW50cmllcycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOidDb3VudHJpZXNDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOnZpZXcoJ2NvdW50cmllcycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXRlKCdxdWVzdGlvbnMnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvcXVlc3Rpb25zJyxcbiAgICAgICAgICAgICAgICB2aWV3czp7XG4gICAgICAgICAgICAgICAgICAgIG1haW46e1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjonUXVlc3Rpb25zQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogdmlldygncXVlc3Rpb25zJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1dKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlclxuICAgICAgICAgICAgLnNldEJhc2VVcmwoJy9hZG1pbi8nKVxuICAgICAgICAgICAgLnNldERlZmF1bHRIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nY3NyZi10b2tlbiddXCIpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNldFBhcmVudGxlc3ModHJ1ZSk7XG5cbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGZ1bmN0aW9uKGRhdGEsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgZGVmZXJyZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXdSZXNwb25zZTtcbiAgICAgICAgICAgIHN3aXRjaCAod2hhdCArICc6JyArIG9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJzOmdldExpc3QnOlxuICAgICAgICAgICAgICAgICAgICBuZXdSZXNwb25zZSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVzcG9uc2UubWV0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgICAgICBuZXdSZXNwb25zZSA9IGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdSZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignQ291bnRyaWVzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCAkc2NvcGUpe1xuXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignUXVlc3Rpb25zQ29udHJvbGxlcicsIGZ1bmN0aW9uKCAkc2NvcGUpe1xuXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJykuY29udHJvbGxlcignVXNlcnNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VycywgbmdUYWJsZVBhcmFtcywgJGxvY2F0aW9uLCBSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHZhciBUYWJsZSA9IG5nVGFibGVQYXJhbXM7XG4gICAgICAgIHZhciBwYWdlID0gXy5nZXQoJGxvY2F0aW9uLnNlYXJjaCgpLCAncGFnZScsIDEpO1xuICAgICAgICB2YXIgY291bnQgPSBfLmdldCgkbG9jYXRpb24uc2VhcmNoKCksICdjb3VudCcsIDEwKTtcbiAgICAgICAgdmFyIGVycm9ycyA9IHt9O1xuXG4gICAgICAgICRzY29wZS51c2VycyA9IFVzZXJzO1xuICAgICAgICAkc2NvcGUuJGVkaXQgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLmVycm9ycyA9IGZhbHNlO1xuXG5cbiAgICAgICAgJHNjb3BlLnRhYmxlUGFyYW1zID0gbmV3IFRhYmxlKHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsICAgICAgICAgICAgLy8gc2hvdyBmaXJzdCBwYWdlXG4gICAgICAgICAgICBjb3VudDogY291bnQgICAgICAgICAgIC8vIGNvdW50IHBlciBwYWdlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvdW50czogZmFsc2UsXG4gICAgICAgICAgICB0b3RhbDogVXNlcnMubWV0YS50b3RhbCwgLy8gbGVuZ3RoIG9mIGRhdGFcbiAgICAgICAgICAgIGdldERhdGE6IGZ1bmN0aW9uICgkZGVmZXIsIHBhcmFtcykge1xuXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnNlYXJjaChwYXJhbXMudXJsKCkpOyAvLyBwdXQgcGFyYW1zIGluIHVybFxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFJlc3Rhbmd1bGFyLmFsbCgndXNlcnMnKS5nZXRMaXN0KHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogcGFyYW1zLnBhZ2UoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmVkaXQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5zYXZlKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgZGF0YS4kZWRpdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB1c2VyLnBsYWluKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgZXJyb3JzLmVtYWlsID0gXy5nZXQoZXJyb3IsIFsnZGF0YScsICdlbWFpbCcsIDBdLCAnJyk7XG4gICAgICAgICAgICAgICAgZXJyb3JzLm5hbWUgID0gXy5nZXQoZXJyb3IsIFsnZGF0YScsICduYW1lJywgMF0sICcnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZSA9IGZ1bmN0aW9uICh1c2VyLCRkYXRhLCRpbmRleCkge1xuICAgICAgICAgICAgdXNlci5yZW1vdmUoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgJGRhdGEuc3BsaWNlKCRpbmRleCwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=