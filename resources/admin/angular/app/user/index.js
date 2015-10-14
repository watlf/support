(function(){
    "use strict";

    angular.module('app.controller').controller('UsersController', function($scope, Users, ngTableParams, $location, Restangular, $timeout) {

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
    });
})();
