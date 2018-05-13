/*global angular*/
/*global Highcharts*/

angular
    .module("managerApp")
    .controller("ProgWeb1Ctrl", ["$http", "$scope", function($http, $scope) {


        //Variables de mi API


        var rapes = [];
        
        //Variables api seleccionada 
        var category = [];
        var center = [];


        $http
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/Spain.json?country=us&access_token=pk.eyJ1IjoibWp0ciIsImEiOiJjajNhOTBicWgwMDNqMzhsdzBsZ3JpNzExIn0.jbbfuU8l2LplqSooVeLlHQ")
            .then(function(response) {

                console.log("Datos progweb cogidos correctamente");

                for (var i = 0; i < 5; i++) {
                    var x = response.data.features[i];
                    category.push(x.properties.category);
                    console.log(category);
                    center.push(Number(x.center[0]));
                    center.push(Number(x.center[1]));

                    console.log(center);
                }

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var y = response.data[i];
                 
                            rapes.push(Number(y["number-of-rape"])/100);

                            console.log(y.country);

                        }

                        Highcharts.chart('rape&progweb', {

                            title: {
                                text: 'rape and Center Spain map coordinates compare'
                            },

                            subtitle: {
                                text: ''
                            },

                            yAxis: {
                                title: {
                                    text: 'Number of data'
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: false
                                    },
                                    enableMouseTracking: true
                                }
                            },

                            series: [{
                                name: 'Features Center',
                                data: center
                            }, {
                                name: 'number of rapes',
                                data: rapes
                            }]

                        });

                    });

            });

    }]);
