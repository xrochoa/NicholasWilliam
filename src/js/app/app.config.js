'use strict';

module.exports = function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/upload.html',
            controller: 'upload'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
};