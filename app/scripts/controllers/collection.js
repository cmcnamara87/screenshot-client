'use strict';

angular.module('screenshotApp')
    .controller('CollectionCtrl', function($scope, files, collection, allFiles) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.files = files;
        $scope.collection = collection;
        $scope.allFiles = allFiles;

        $scope.addFileToCollection = function(file) {
            // window.alert('adding file');
            collection.all('files').post(file);
            $scope.files.push(file);
        };
    });
