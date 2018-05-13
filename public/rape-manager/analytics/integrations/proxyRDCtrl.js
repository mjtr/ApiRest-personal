/*global angular*/
/*global Highcharts*/

angular
    .module("managerApp")
    .controller("proxyRDCtrl", ["$http", "$scope", function($http, $scope) {

        var years = [];
        var rapes = [];

        var divorces = [];

        $http.get("/proxyDivorce").then(function(response) {

            for (var j = 0; j < response.data.length; j++) {

                divorces.push(response.data[j].divorce);
            }



            $http
                .get("/api/v2/rape-stats")
                .then(function(response) {

                    for (var i = 0; i < response.data.length; i++) {
                        var x = response.data[i];
                        years.push(x.year);
                        rapes.push(x["number-of-rape"]);
                        years.sort((x, y) => { return x > y; });

                    }


                    Highcharts.chart('ProxyRD', {
                        chart: {
                            zoomType: 'xy'
                        },
                        title: {
                            text: 'Divorces and Rape Incidences'
                        },
                        subtitle: {
                            text: 'wikipedia.com'
                        },
                        xAxis: [{
                            categories: years,
                            crosshair: true
                        }],
                        yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value} rapes',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'Number of Rapes',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }, { // Secondary yAxis
                            title: {
                                text: 'Number of Divorces',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            labels: {
                                format: '{value} divorces',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            opposite: true
                        }],
                        tooltip: {
                            shared: true
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            x: 120,
                            verticalAlign: 'top',
                            y: 200,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                        },
                        series: [{
                            name: 'Divorces',
                            type: 'column',
                            yAxis: 1,
                            data: divorces,
                            tooltip: {
                                valueSuffix: ''
                            }

                        }, {
                            name: 'Rapes',
                            type: 'spline',
                            data: rapes,
                            tooltip: {
                                valueSuffix: ''
                            }
                        }]
                    });

                });

        });

    }]);
