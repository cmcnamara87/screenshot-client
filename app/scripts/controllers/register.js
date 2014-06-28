'use strict';

angular.module('screenshotApp')
    .controller('RegisterCtrl', function($scope, Restangular, $state) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.register = function(user) {
            console.log('go!');
            Restangular.all('users').register(user).then(function() {
                $state.go('me.collections');
            });
        };
    });
