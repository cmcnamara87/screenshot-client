'use strict';

angular.module('screenshotApp')
    .controller('LoginCtrl', function($scope, Restangular, $state, $rootScope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.login = function(credentials) {
            Restangular.all('users').login(credentials).then(function(currentUser) {
                $state.go('me.collections');
                $rootScope.currentUser = currentUser;
            }, function() {});
        };
    });
