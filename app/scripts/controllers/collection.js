'use strict';

angular.module('screenshotApp')
    .controller('CollectionCtrl', function($scope, files, collection) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.files = files;
        $scope.collection = collection;
    });
