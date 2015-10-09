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