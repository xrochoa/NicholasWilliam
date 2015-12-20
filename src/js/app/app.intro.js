'use strict';

module.exports = function($scope) {

    $scope.number = 50;

    $scope.getNumber = function(number) {
        return new Array(number);
    }

    $scope.getStyle = function(number) {
        return {
            'animation-delay': number + 's'
        };
    }

};