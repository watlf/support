(function(){
    "use strict";

    angular.module('app.config').config(function(RestangularProvider) {

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
    });
})();