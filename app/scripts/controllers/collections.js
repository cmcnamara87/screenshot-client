'use strict';

angular.module('screenshotApp')
    .controller('CollectionsCtrl', function($scope, collections) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.collections = collections;
    });
