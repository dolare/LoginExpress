(function(){
    'user strict';


    var app = angular.module('app',[]);

    app.factory('login',function($http){

        var user = undefined;
        var loginInfo = {};
        var changes = [];
        var change = function(data){
            changes.forEach(function(fn){
                fn(data);
            });
            loginInfo.info = data;
            return loginInfo;
        }
        return {
            login:function(user){
                return $http.post('/api/login',user).then(change);
            },

            logout:function(){

                return $http.delete('/api/login').then(change);

            },

            isLogin:function(){
                return $http.get('/api/login').then(change);
         
            },

            loginInfo:loginInfo,
            onchange:function(fn){
                changes.push(fn);
            }
        };
    
    });

    app.service('login1',function($http){
        this.login = function(){};
        this.logout = function(){};
        this.isLogin = function(){};
    });


    app.controller('mainCtrl',function($scope,login){
            login.isLogin();
            $scope.logout = function(){
                login.logout();
            };
                
            login.onchange(function(data){
                $scope.loginInfo = data.data;
            });   
            
            

    });


    app.controller('loginCtrl',['$scope','login',
        function($scope,login){
            var self = this;
            login.isLogin();
            
            //self.login = login.login.bind(login);
            self.login = function(user){
                login.login(user);
            };

            login.onchange(function(data){
                self.loginInfo = data.data;
            });            
        }]);

})();
