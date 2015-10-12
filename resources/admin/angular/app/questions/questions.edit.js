(function(){
    "use strict";

    angular.module('app.controller').controller('QuestionsEditController', function( $scope, Question, $timeout) {
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
    });
})();