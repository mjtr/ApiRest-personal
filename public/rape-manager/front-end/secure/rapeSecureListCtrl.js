/*global angular*/
angular.module("managerApp").controller("rapeSecureListCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("rapeSecureListCtrl   ok");
    $scope.url = "api/v1/secure/rape-stats";
   
   
   // refresh();
    
    console.log("la key actual es : " + $scope.apikey);
    
    
    $scope.loadInitialData = function() {
            console.log("la key actual es: "+ $scope.apikey);
        $http.get($scope.url + "/loadInitialData" + "?apikey=" + $scope.apikey)
            .then(function successCallback(response) {
                console.log("datos creados correctamente");
                refresh();
                alert("data collection created");

            }, function(response) {

                switch (response.status) {
                    case 409:
                        alert("Error, you are trying create a existing database");
                        refresh();
                        break;
                    case 401:
                        alert("please, introduce the apikey");
                        break;
                    case 403:
                        alert("apikey incorrect");
                    default:
                        alert("Error try again");
                        break;
                }
            });
    };

    function refresh() {
        console.log("hemos entrado en el refresh y la apikey es: " + $scope.apikey);
        $http
            .get($scope.url + "?apikey=" + $scope.apikey)

            .then(function successCallback(response) {
                console.log("estamos dentro del refresh y hemos cogido los datos correctamente");
                $scope.database = response.data;

            }, function(response) {
                $scope.database = [];
                switch (response.status) {
                    case 404:
                        alert("no database found");
                        break;
                    case 401:
                        alert("please, introduce the apikey");
                        break;
                    case 403:
                        alert("apikey incorrect");
                    default:
                        alert("Error try again");
                        break;
                }
            });

    }

    $scope.borradoTotal = function() {

        $http.delete($scope.url + "?apikey=" + $scope.apikey )

            .then(function successCallback(response) {
                console.log("Hemos borrado los datos correctamente");
                refresh();
                alert("Todos los datos se han borrado correctamente");

            }, function errorCallback(response) {
                console.log("No se han podido borrar todos los datos");
            });
    };

    $scope.borrarDato = function(country, year) {

        $http.delete($scope.url + "/" + country + "/" + year + "?apikey=" + $scope.apikey)

            .then(function successCallback(response) {
                console.log("borrado del dato completado con éxito");
                refresh();
                alert("Dato borrado correctamente");


            }, function errorCallback(response) {
                alert("no se ha borrado el dato");
                console.log("No se ha podido borrar el dato en concreto");


            });

    };

    $scope.add = function(newData) {

        $scope.newData.year = Number($scope.newData.year);
        $scope.newData['number-of-rape'] = Number($scope.newData['number-of-rape']);
        $scope.newData.rate = Number($scope.newData.rate);
        $scope.newData['total-since-two-thousand'] = Number($scope.newData["total-since-two-thousand"]);

        $http
            .post($scope.url + "?apikey=" + $scope.apikey, newData)

            .then(function(response) {
                console.log("Created");
                refresh();
                alert("Añadido correctamente");


            }, function(response) {

                switch (response.status) {
                    case 409:
                        alert("Error, you are trying to add a existing country");
                        break;
                    case 400:
                        alert("You have not fill all data");
                        break;
                    default:
                        alert("Error try again");
                        break;
                }
            });
    };

    $scope.take = function (){
       
        console.log("hemos entrado en el take y la apikey es: " + $scope.apikey);
        $http
            .get($scope.url + "?apikey=" + $scope.apikey)

            .then(function successCallback(response) {
                $scope.database = response.data;

            }, function(response) {
                $scope.database = [];
                switch (response.status) {
                    case 404:
                        alert("no database found");
                        break;
                    case 401:
                        alert("please, introduce the apikey");
                        break;
                    case 403:
                        alert("apikey incorrect");
                    default:
                        alert("Error try again");
                        break;
                }
            });

        
    }

    /*****Búsquedas****/
    $scope.searchYear = function(from, to) {

        $http.get($scope.url+ "?apikey=" + $scope.apikey + "&" + "from=" + from + "&" + "to=" + to)

            .then(function successCallback(response) {
                console.log("busqueda por años realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };

    $scope.searchCountry = function(name) {

        $http.get($scope.url + "?apikey=" + $scope.apikey + "&" + "country=" + name)

            .then(function successCallback(response) {
                console.log("busqueda por países realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                $scope.database = [];

            });


    };

    $scope.searchRape = function(fromRape, toRape) {

        $http.get($scope.url + "?apikey=" + $scope.apikey + "&" + "from-rape=" + fromRape + "&" + "to-rape=" + toRape)

            .then(function successCallback(response) {
                console.log("busqueda por rape realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };

    $scope.searchRate = function(fromRate, toRate) {

        $http.get($scope.url + "?apikey=" + $scope.apikey + "&" + "from-rate=" + fromRate + "&" + "to-rate=" + toRate)

            .then(function successCallback(response) {
                console.log("busqueda por porcentajes realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };

    $scope.searchTotal = function(fromTotal, toTotal) {

        $http.get($scope.url + "?apikey=" + $scope.apikey + "&" + "from-total=" + fromTotal + "&" + "to-total=" + toTotal)

            .then(function successCallback(response) {
                console.log("busqueda por totales realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };



}]);
