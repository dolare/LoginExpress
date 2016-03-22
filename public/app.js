(function(){
    'user strict';


    var app = angular.module('app',[]);
    app.controller('mainCtrl',function($scope,$http,$rootScope){
            $scope.logout = function(){
                $http.delete('/api/login').success(function(){
                    $scope.user = undefined;
                    $scope.nu = null;
                    $rootScope.$broadcast('logout');
                });
            };
            
            $scope.$on('login sucess',function(e,user){
                $scope.user = user;
            });

    });


    app.controller('loginCtrl',['$scope','$http','$rootScope',
        function($scope,$http,$rootScope){
            var self = this;
            
            $scope.$on('logout',function(){
                self.user = undefined;   
            })

            $http.get('/api/login').success(function(
            resp){
                if(resp.username)
                self.user = resp;
                $rootScope.$broadcast('login sucess',self.user);

            });

            self.login = function(user){
                $http.post('/api/login',user)
                .then(function(data){
                    if(data.data.username){
                        self.user = data.data;
                        $rootScope.$broadcast('login sucess',
                            self.user);
                    }
                    else self.msg = data.data.msg;
                });

            }
        }]);

})();
