(function(){
    "use strict";

    angular.module('app.controller').controller('QuestionsListController', function( $scope, $state, Questions, ngTableParams, $location, Restangular) {
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
    });
})();