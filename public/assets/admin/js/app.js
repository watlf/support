(function(){
    "use strict";

    var app = angular.module('app', [
        'ui.router',
        'app.router',
        'app.controller'
    ]);

    angular.module('app.router', ['ui.router']);
    angular.module('app.controller', []);
})();
(function(){
    "use strict";

    angular.module('app.router').config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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

    angular.module('app.controller').controller('UsersController', ["$scope", function($scope) {
        $scope.users = 'It works!';
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlLmpzIiwiYXBwL2NvdW50cmllcy9pbmRleC5qcyIsImFwcC9xdWVzdGlvbnMvaW5kZXguanMiLCJhcHAvdXNlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgICAgICd1aS5yb3V0ZXInLFxuICAgICAgICAnYXBwLnJvdXRlcicsXG4gICAgICAgICdhcHAuY29udHJvbGxlcidcbiAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVyJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVyJywgW10pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVyJykuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICAgICB2YXIgdmlldyA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcvYXNzZXRzL2FkbWluL3ZpZXdzL2FwcC8nICsgdGVtcGxhdGUgKyAnL2luZGV4Lmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy91c2VycycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ3VzZXJzJywge1xuICAgICAgICAgICAgICAgIHVybDonL3VzZXJzJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOidVc2Vyc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXcoJ3VzZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGF0ZSgnY291bnRyaWVzJywge1xuICAgICAgICAgICAgICAgIHVybDonL2NvdW50cmllcycsXG4gICAgICAgICAgICAgICAgdmlld3M6e1xuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRyb2xsZXI6J0NvdW50cmllc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6dmlldygnY291bnRyaWVzJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhdGUoJ3F1ZXN0aW9ucycsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy9xdWVzdGlvbnMnLFxuICAgICAgICAgICAgICAgIHZpZXdzOntcbiAgICAgICAgICAgICAgICAgICAgbWFpbjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRyb2xsZXI6J1F1ZXN0aW9uc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHZpZXcoJ3F1ZXN0aW9ucycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdDb3VudHJpZXNDb250cm9sbGVyJywgZnVuY3Rpb24oICRzY29wZSl7XG5cbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdRdWVzdGlvbnNDb250cm9sbGVyJywgZnVuY3Rpb24oICRzY29wZSl7XG5cbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXInKS5jb250cm9sbGVyKCdVc2Vyc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLnVzZXJzID0gJ0l0IHdvcmtzISc7XG4gICAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9