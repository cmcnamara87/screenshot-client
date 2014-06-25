'use strict';

angular
    .module('screenshotApp', [
        'ngCookies',
        'ui.router',
        'restangular'
    ])
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        console.log('here');
        // For any unmatched url, redirect to /state1
        // $urlRouterProvider.otherwise('/');

        RestangularProvider.setBaseUrl('api/index.php');
        RestangularProvider.setDefaultHttpFields({
            withCredentials: true
        });

        console.log('cant work out the routes booo');

        // Now set up the states
        $stateProvider
            .state('collection', {
                url: '/collections/:collectionId',
                resolve: {
                    collection: ['Restangular', '$stateParams',
                        function(Restangular, $stateParams) {
                            return Restangular.one('me').one('collections', $stateParams.collectionId).get();
                        }
                    ],
                    files: ['Restangular', '$stateParams',
                        function(Restangular, $stateParams) {
                            return Restangular.one('me').one('collections', $stateParams.collectionId).all('files').getList();
                        }
                    ],
                    allFiles: ['Restangular', '$stateParams',
                        function(Restangular) {
                            return Restangular.one('me').all('files').getList().then(function(files) {
                                return files.reverse();
                            });
                        }
                    ],
                },
                controller: 'CollectionCtrl',
                templateUrl: 'views/collection.html'
            })
            .state('state1.list', {
                url: '/list',
                templateUrl: 'partials/state1.list.html',
                controller: function($scope) {
                    $scope.items = ['A', 'List', 'Of', 'Items'];
                }
            })
            .state('state2', {
                url: '/state2',
                templateUrl: 'partials/state2.html'
            })
            .state('state2.list', {
                url: '/list',
                templateUrl: 'partials/state2.list.html',
                controller: function($scope) {
                    $scope.things = ['A', 'Set', 'Of', 'Things'];
                }
            });
    });
