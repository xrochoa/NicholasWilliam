'use strict';

module.exports = function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/intro.html',
            controller: 'intro'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
};