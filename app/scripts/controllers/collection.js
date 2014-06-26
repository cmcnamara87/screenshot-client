'use strict';

angular.module('screenshotApp')
    .controller('CollectionCtrl', function($scope, files, currentUser, collection, Restangular) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.files = files;
        $scope.collection = collection;

        $scope.showAllFiles = function() {
            console.log('here');
            $scope.isShowingAllFiles = true;
            Restangular.one('me').all('files').getList().then(function(allFiles) {
                allFiles = _.reject(allFiles, function(allFile) {
                    return _.findWhere(files, {
                        id: allFile.id
                    });
                }).reverse();
                $scope.allFiles = allFiles;
            });
        };

        $scope.addFileToCollection = function(file) {
            // window.alert('adding file');
            Restangular.one('me').one('collections', collection.id).all('files').post(file);
            // collection.all('files').post(file);
            $scope.files.push(file);
        };
    });
