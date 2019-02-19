/*global angular*/
/*global Highcharts*/
angular
    .module("managerApp")
    .controller("rapeHighCtrl", ["$http", "$scope", function($http, $scope) {

        var years = [];
        var countries = [];
        var rate = [];
        var totalDivYear = [];
        var totalDivCountry = [];
        var rapesDiv = [];


        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {
                $scope.data = response.data;

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
                        rate[y] = x.rate;

                    }
                    else {
                        countries.push(x.country);
                        rapesDiv.push(parseInt(x["number-of-rape"] / 1000));
                        totalDivCountry.push(parseInt(x["total-since-two-thousand"] / 1000));
                        rate.push(x.rate);

                    }
                    years.sort((x, y) => { return x > y; });

                }

                Highcharts.chart('rapeHighcharts', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'All rape data'
                    },
                    subtitle: {
                        text: 'Source: <a href="https://es.wikipedia.org/wiki/Estad%C3%ADstica_de_violaciones">Wikipedia.org</a>'
                    },
                    xAxis: {
                        categories: countries,
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'total rapes since two thousand (thousand) ',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: '  '
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series:

                        [{
                                name: 'Total Rapes',
                                data: totalDivCountry
                            },
                            {
                                name: 'Number of rapes',
                                data: rapesDiv
                            }, {
                                name: 'Rate',
                                data: rate
                            }, {
                                name: 'Year',
                                data: years.map((x) => { return x / 1000 })
                            }
                        ]
                });

            });
    }]);
