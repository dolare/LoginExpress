(function(){
    'user strict';


    var app = angular.module('app',[]);

    app.controller('loginCtrl',['$scope','$http',
        function($scope,$http){
            var self = this;

            $http.get('/api/login').success(function(
            resp){
                if(resp.username)
                self.user = resp;

            });

            self.login = function(user){
                $http.post('/api/login',user)
                .then(function(data){
                    if(data.data.username)
                        self.user = data.data;
                    else self.msg = data.data.msg;
                });

            }
            self.logout = function(){
                $http.delete('/api/login').success(function(){
                    self.user = undefined;
                $scope.nu = null;
                });
            };
            
        }]);

})();
