'use strict';

var app = window.angular.module('app', ['ngRoute'])
    .controller('intro', ['$scope', require('./app.intro.js')])
    .config(['$routeProvider', '$locationProvider', require('./app.config.js')]);