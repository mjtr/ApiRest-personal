/*global angular*/
/*global Highcharts*/

angular
    .module("managerApp")
    .controller("normalRWCtrl", ["$http", "$scope", function($http, $scope) {

        
        var conjunto1 = [];
        var conjunto2 = [];


        $http
            .get("https://sos1718-05.herokuapp.com/api/v1/world-stats")
            .then(function (response){
                
                for(var j = 0; j< response.data.length ; j++){
                    var y = response.data[j];
                    conjunto1.push([y.year,y.sale]);
                }
                
        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                        conjunto2.push([x.year,x["total-since-two-thousand"]/1000]);
                    
                    
                }

                Highcharts.chart('NormalRW', {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Total rapes vs World Sales'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'year'
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Total'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x} , {point.y} '
                            }
                        }
                    },
                    series: [{
                        name: 'World sales',
                        color: 'rgba(223, 83, 83, .5)',
                        data: conjunto1

                    }, {
                        name: 'Total rapes',
                        color: 'rgba(119, 152, 191, .5)',
                        data: conjunto2
                    }]
                });

            });

    });

    }]);
