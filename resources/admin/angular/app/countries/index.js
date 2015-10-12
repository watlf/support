(function(){
    "use strict";

    angular.module('app.controller').controller('CountriesController', function($scope, Countries, ngTableParams, $location, Restangular, $timeout) {

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

    });
})();