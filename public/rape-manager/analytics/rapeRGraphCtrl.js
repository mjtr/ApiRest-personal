/*global angular*/
/*global RGraph*/
angular
    .module("managerApp")
    .controller("rapeRGraphCtrl", ["$http", "$scope", function($http, $scope) {

        var years = [];
        var countries = [];
        var total = [];
        var rapes = [];
        var rateCountry = [];

        var totalDivYear = [];
        var totalDivCountry = [];
        var rapesDiv = [];

        $http
            .get("/api/v2/rape-stats")

            .then(function successCallback(response) {


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
                        rapes[y] = rapes[y] + x["number-of-rape"];
                        rapesDiv[y] = rapesDiv[y] + (parseInt(x["number-of-rape"] / 1000));
                        totalDivCountry[y] = totalDivCountry[y] + parseInt((x["total-since-two-thousand"] / 1000));
                        total[y] = total[y] + (x["total-since-two-thousand"]);
                        rateCountry[y] = x.rate;


                    }
                    else {
                        rapes.push(x["number-of-rape"]);
                        countries.push(x.country);
                        rapesDiv.push(parseInt(x["number-of-rape"] / 1000));
                        totalDivCountry.push(parseInt(x["total-since-two-thousand"] / 1000));
                        total.push(x["total-since-two-thousand"]);
                        rateCountry.push(x.rate);

                    }
                    years.sort((x, y) => { return x > y; });

                }

                var line = new RGraph.SVG.Line({
                    id: 'rapeyear',
                    data: totalDivYear,
                    options: {
                        colors: ['white'],
                        linewidth: 5,
                        backgroundGridColor: '#666',
                        backgroundGridVlinesCount: years.length,
                        backgroundColor: 'black',
                        xaxis: false,
                        xaxisTickmarks: false,
                        xaxisLabels: years,
                        xaxisLabelsPosition: 'section',
                        yaxisTickmarks: false,
                        yaxis: true,
                        spline: true,
                        filled: true,
                        filledColors: ['Gradient(rgba(255,0,0,0.75):rgba(255,0,0,0.5):rgba(255,0,0,0))']
                    }
                }).trace();

                line.svg.style.borderTopLeftRadius = '25px';
                line.svg.style.borderBottomRightRadius = '25px';

                /***Segunda tabla**/

                new RGraph.SVG.Line({
                    id: 'chart-container',
                    data: [rapesDiv, totalDivCountry],
                    options: {
                        xaxisLabels: countries,
                        filled: true,
                        filledColors: ['transparent', 'rgba(0,255,0,0.25'],
                        filledAccumulative: true,
                        colors: ['green', 'green'],
                        spline: true,
                        linewidth: 2,
                        backgroundGridVlines: false,
                        backgroundGridBorder: false,
                        xaxis: false,
                        yaxis: true
                    }
                }).trace();

                /***Tercera tabla***/

                var colors = ['orange', '#c00'];

                RGraph.SVG.GLOBALS.colors = colors;

                var hbar1 = new RGraph.SVG.HBar({
                    id: 'cc2',
                    data: rateCountry,
                    options: {
                        key: ['rapes rate per country'],
                        yaxisLabels: countries,
                        grouping: 'stacked',
                        strokestyle: 'white',
                        textSize: 8,
                        backgroundGridHlines: false,
                        backgroundGridBorder: false,
                        xaxis: false,
                        yaxisTickmarks: false,
                        vmargin: 7
                    }
                }).draw();




            }, function errorCallback(response) {
                console.log("Error al cargar los datos, no se encuentran");
                $scope.database = [];

            });




    }]);
