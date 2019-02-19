/*global angular*/
/*global RGraph*/
angular
    .module("managerApp")
    .controller("rapeRGraphCtrl", ["$http", "$scope", function($http, $scope) {

        var years = [];
        var countries = [];
        var rateCountry = [];

        var totalDivYear = [];
        var totalDivCountry = [];
        var rapesDiv = [];


        $http
            .get("/api/v2/rape-stats")

            .then(function(response) {


                for (var i = 0; i < response.data.length; i++) {

                    var x = response.data[i];

                    if (years.includes(x.year) == false) {
                        years.push(x.year);
                        totalDivYear.push(parseInt(x["total-since-two-thousand"] / 1000));
                    }
                    else {
                        var z = years.indexOf(z);
                        totalDivYear[z] = totalDivYear[z] + parseInt(x["total-since-two-thousand"] / 1000);

                    }

                    if (countries.includes(x.country)) {
                        var y = countries.indexOf(x.country);
                        rapesDiv[y] = rapesDiv[y] + (parseInt(x["number-of-rape"] / 1000));
                        totalDivCountry[y] = totalDivCountry[y] + parseInt((x["total-since-two-thousand"] / 1000));
                        rateCountry[y] = x.rate;


                    }
                    else {
                        countries.push(x.country);
                        rapesDiv.push(parseInt(x["number-of-rape"] / 1000));
                        totalDivCountry.push(parseInt(x["total-since-two-thousand"] / 1000));
                        rateCountry.push(x.rate);

                    }
                    years.sort((x, y) => { return x > y; });

                }
                var data = [
                    [rapesDiv[0], rateCountry[0], totalDivCountry[0], countries[0]],
                    [rapesDiv[1], rateCountry[1], totalDivCountry[1], countries[1]],
                    [rapesDiv[2], rateCountry[2], totalDivCountry[2], countries[2]],
                    [rapesDiv[3], rateCountry[3], totalDivCountry[3], countries[3]],
                    [rapesDiv[4], rateCountry[4], totalDivCountry[4], countries[4]],
                    [rapesDiv[5], rateCountry[5], totalDivCountry[5], countries[5]],
                    [rapesDiv[6], rateCountry[6], totalDivCountry[6], countries[6]],

                ];

                var gantt = new RGraph.Gantt({
                    id: 'cvs',
                    data: data,
                    options: {
                        labels: years,
                        xmax: 122,
                        labelsPercent: true,
                        textAccessible: true
                    }
                });

                gantt.draw();


            }, function errorCallback(response) {
                console.log("Error al cargar los datos, no se encuentran");
                $scope.database = [];

            });




    }]);
