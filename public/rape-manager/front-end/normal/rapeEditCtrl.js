/*global angular*/

angular.module("managerApp")
.controller("rapeEditCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    console.log("Edit controller initialized");
    $scope.url  = "api/v1/rape-stats/";

    function refresh(){
        $http
            .get($scope.url +  $routeParams.country + "/" + Number($routeParams.year))
            .then(function successCallback(response) {
                    $scope.updateData = response.data[0];

                }, function errorCallback(response) {
                    console.log("Entra1");
                    $scope.updateData = [];

                });
    }
    
    $scope.actualizaData = function(updateData){
      
            $http
                .put($scope.url  + updateData.country + "/" + Number(updateData.year) , {
                    country: updateData.country,
                    year: updateData.year,
                    ["number-of-rape"]: updateData["number-of-rape"],
                    rate: updateData.rate,
                    ["total-since-two-thousand"]: updateData["total-since-two-thousand"]
                })
                .then(function(response) {
                    console.log("Stat Updated 2");
                    switch (response.status) {
                        case 400:
                            alert("Please fill all the fields");
                            break;
                        default:
                            alert("OK");
                            break;
                    }
                    $location.path("/api/v1/rape-stats");

                });
        };



        refresh();
    
}]);