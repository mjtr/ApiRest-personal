/*global angular*/
angular.module("managerApp").controller("rapeListCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("rapeListCtrl  ok");
    $scope.url = "/api/v2/rape-stats";
    refresh();

    $scope.loadInitialData = function() {

        $http.get($scope.url + "/loadInitialData")
            .then(function successCallback(response) {
                console.log("datos creados correctamente");
                refresh();
                alert("datos creados correctamente");

            }, function errorCallback(response) {
                console.log("los datos ya estaban creados o algo ha pasado con el loadInitialData");

            });
    };

    function refresh() {
        $http
            .get($scope.url)

            .then(function successCallback(response) {
                console.log("estamos dentro del refresh y hemos cogido los datos correctamente");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos, no se encuentran");
                $scope.database = [];

            });
    }

    $scope.borradoTotal = function() {

        $http.delete($scope.url)

            .then(function successCallback(response) {
                console.log("Hemos borrado los datos correctamente");
                refresh();
                alert("Todos los datos se han borrado correctamente");

            }, function errorCallback(response) {
                console.log("No se han podido borrar todos los datos");
            });
    };

    $scope.borrarDato = function(country, year) {

        $http.delete($scope.url + "/" + country + "/" + year)

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
            .post($scope.url, newData)

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


    /*****Búsquedas****/
    $scope.searchYear = function(from, to) {

        $http.get($scope.url + "?" + "from=" + from + "&" + "to=" + to)

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

        $http.get($scope.url + "?" + "country=" + name)

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

        $http.get($scope.url + "?" + "from-rape=" + fromRape + "&" + "to-rape=" + toRape)

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

        $http.get($scope.url + "?" + "from-rate=" + fromRate + "&" + "to-rate=" + toRate)

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

        $http.get($scope.url + "?" + "from-total=" + fromTotal + "&" + "to-total=" + toTotal)

            .then(function successCallback(response) {
                console.log("busqueda por totales realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };


    /****Paginación***/


    $scope.pagination = function(limit, offset) {
        console.log("Hemos entrado en el pagination");

        $scope.currentPage = 1;
        $scope.offset = offset;
        var pages = [];
        if ($scope.limit > 0) {
            $http
                .get($scope.url)
                .then(function(response) {
                    console.log("dentro del get de pagination");

                    for (var i = 1; i <= ((response.data.length - $scope.offset) / $scope.limit); i++) {
                        pages.push(i);

                    }
                    if (pages.length * $scope.limit < response.data.length - $scope.offset) {
                        pages.push(pages.length + 1);
                    }
                    $scope.pages = pages;
                    document.getElementById("numberPagination").disabled = false;
                });

            $http.get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function successCallback(response) {
                    console.log("estamos dentro del limit y offset y hemos cogido los datos correctamente");
                    $scope.database = response.data;

                }, function errorCallback(response) {
                    console.log("Error al cargar los datos, no se encuentran");
                    $scope.database = [];

                });

        }
        else {
            refresh();
        }

    };

    $scope.newPage = function(pageNumber) {
        console.log("estamos dentro del new page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);

        var limit = $scope.limit;
        $scope.currentPage = pageNumber;
        //cambiamos el offset para que nos muestre los siguientes elementos
        $scope.offset = pageNumber * limit - parseInt($scope.limit);
        $http
            .get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.database = response.data;
            });

    };

    $scope.nextPage = function(pageNumber) {
        console.log("estamos dentro del next page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);
        $scope.currentPage = pageNumber;
        $scope.offset = parseInt($scope.offset) + parseInt($scope.limit);
        $http
            .get($scope.url + "?limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.database = response.data;
            });

    };

    $scope.previousPage = function(pageNumber) {
        console.log("estamos dentro del previous page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);

        var viewby = $scope.limit;
        $scope.currentPage = pageNumber;
        $scope.offset -= viewby;

        $http
            .get($scope.url + "?" + "limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.database = response.data;
            });

    };



}]);
