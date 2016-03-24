(function() {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(function($routeProvider){
             $routeProvider
            .when('/page1',{
                templateUrl:'page1.html',
                controller:'page1Ctrl'
             })
             .when('/page2',{
                templateUrl:'page2.html',
                controller:'page2Ctrl'
             });       
        
        })
        .directive('loginForm',function($http){
            return{
                templateUrl:'login.html',
                scope:{
                    info:"=info2",
                    login2:"&"
                },
                controller:['$scope',function(scope){
                    scope.login = function(user) {
                        $http.post('/api/login', user).then(function(data) {
                            //scope.info = data.data;
                            scope.login2({info:data.data});
                        });
                    }
                }]
            }
        })


})();
