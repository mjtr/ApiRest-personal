/*global angular*/
/*global Plotly*/

angular
    .module("managerApp")
    .controller("clashApiCtrl", ["$http", "$scope", function($http, $scope) {

        var conjunto1 = [];
        var conjunto2 = [];

        //var urlExt = "https://www.clashapi.xyz/api/arenas";
        $http
            .get("/proxyClash")
            .then(function(response) {

                for (var j = 0; j < response.data.length; j++) {
                    var y = response.data[j];
                    conjunto1.push(parseInt([y.minTrophies]));
                }

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var x = response.data[i];
                            conjunto2.push(x["number-of-rape"]);

                        }

                        console.log(conjunto1);
                        console.log("");
                        console.log(conjunto2);



                        var trace1 = {
                            x: conjunto1,
                            type: 'box',
                            name: 'Clash trophies data'
                        };

                        var trace2 = {
                            x: conjunto2,
                            type: 'box',
                            name: 'rapes'
                        };

                        var data = [trace1, trace2];

                        var layout = {
                            title: 'Clash & rapes'
                        };

                        Plotly.newPlot('clash&rapes', data, layout);


                    });

            });

    }]);
