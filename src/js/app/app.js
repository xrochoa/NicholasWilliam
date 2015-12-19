'use strict';

var app = window.angular.module('app', ['ngRoute'])
    .controller('index', ['$scope', require('./app.index.js')])
    .config(['$routeProvider', '$locationProvider', require('./app.config.js')]);