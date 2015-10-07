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