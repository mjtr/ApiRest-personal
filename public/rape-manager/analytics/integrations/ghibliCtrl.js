/*global angular*/
/*global Plotly*/


angular
    .module("managerApp")
    .controller("ghibliCtrl", ["$http", "$scope", function($http, $scope) {

        var conjunto1 = [];
        var conjunto2 = [];
        var aux = [];
        var aux2 = [];

        var url = "https://ghibliapi.herokuapp.com/films";
        $http
            .get(url)
            .then(function(response) {

                for (var j = 0; j < response.data.length; j++) {
                    var y = response.data[j];
                    conjunto1.push(y.rt_score);
                    aux.push(y.title);
                }

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var x = response.data[i];
                            conjunto2.push(x["number-of-rape"] / 100);
                            aux2.push(x.country);

                        }

                        console.log(conjunto1);
                        console.log("");
                        console.log(conjunto2);


                        var data = [{
                                type: 'scatterpolar',
                                r: conjunto1,
                                theta: aux,
                                fill: 'toself',
                                name: 'Ghibli score'
                            },
                            {
                                type: 'scatterpolar',
                                r: conjunto2,
                                theta: aux2,
                                fill: 'toself',
                                name: 'rape rates'
                            }
                        ]

                        var layout = {
                            polar: {
                                radialaxis: {
                                    visible: true,
                                    range: [0, 150]
                                }
                            }
                        }

                        Plotly.plot("ghibli", data, layout)

                    });

            });

    }]);
