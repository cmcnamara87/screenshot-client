'use strict';

angular.module('screenshotApp')
    .controller('LoginCtrl', function($scope, Restangular) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.login = function(credentials) {
            Restangular.all('users').login(credentials).then(function() {
                // authService.loginConfirmed();
                // $ionicLoading.hide();
                // $rootScope.isLoggedIn = true;
            }, function() {
                // $ionicPopup.alert({
                //     title: 'Couldn\'t log in',
                //     template: 'Check your email and password are correct and try again.'
                // });
                // $scope.modal.show();
            });
        };
    });
