'use strict';

angular
    .module('screenshotApp', [
        'ngCookies',
        'ui.router',
        'restangular'
    ])
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        // For any unmatched url, redirect to /state1
        // $urlRouterProvider.otherwise('/');

        RestangularProvider.setBaseUrl('api/index.php');
        RestangularProvider.setDefaultHttpFields({
            withCredentials: true
        });
        RestangularProvider.addElementTransformer('users', function(user) {
            // This will add a method called login that will do a POST to the path login
            // signature is (name, operation, path, params, headers, elementToPost)
            user.addRestangularMethod('login', 'post', 'login');
            return user;
        });

        // Now set up the states
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .state('me', {
                url: '/me',
                abstract: true,
                resolve: {
                    currentUser: ['Restangular', '$rootScope',
                        function(Restangular, $rootScope) {
                            return Restangular.one('me').one('user').get().then(function(user) {
                                $rootScope.currentUser = user;
                            });
                        }
                    ]
                },
                template: '<ui-view></ui-view>'
            })
            .state('me.collections', {
                url: '/collections',
                resolve: {
                    collections: ['Restangular',
                        function(Restangular) {
                            return Restangular.one('me').all('collections').getList();
                        }
                    ]
                },
                controller: 'CollectionsCtrl',
                templateUrl: 'views/collections.html'
            })
            .state('collection', {
                url: '/collections/:collectionId',
                resolve: {
                    collection: ['Restangular', '$stateParams',
                        function(Restangular, $stateParams) {
                            return Restangular.one('collections', $stateParams.collectionId).get();
                        }
                    ],
                    files: ['Restangular', '$stateParams',
                        function(Restangular, $stateParams) {
                            return Restangular.one('collections', $stateParams.collectionId).all('files').getList();
                        }
                    ],
                    currentUser: ['Restangular', '$rootScope',
                        function(Restangular, $rootScope) {
                            return Restangular.one('me').one('user').get().then(function(user) {
                                $rootScope.currentUser = user;
                            }, function() {
                                return null;
                            });
                        }
                    ]
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
