(function() {
    'use strict';
    angular.module('app').controller('page1Ctrl', function($scope) {
            $scope.title = 'page1';
        })
        .controller('page2Ctrl',function($scope){
            $scope.title = 'page2';

        })
        .controller('LoginCtrl', ['$scope', '$http','$location',
            function(scope, $http,$location) {
                $http.get('/api/login').success(function(resp) {
                    scope.loginInfo = resp;
                });

                scope.logout = function() {
                    $http.delete('/api/login').success(function() {
                        scope.loginInfo = {};
                    })
                };

                scope.onLogin = function(info) {
                    scope.loginInfo = info;

                };

                scope.isActive = function(url){
                    console.log(url);
                    console.log($location.url());
                    if("#" + $location.url()   == url){
                    
                        return 'active';   
                    }return null;   
                }

            }
        ]);
})();
