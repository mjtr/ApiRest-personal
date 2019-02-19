/*global angular*/
/*global RGraph*/

angular
    .module("managerApp")
    .controller("ProgWeb1Ctrl", ["$http", "$scope", function($http, $scope) {


        //Variables de mi API
        var rapes = [];
        //Variables api seleccionada 
        var allData = [];
        var names = [];
        var aux = [];
        var datastring = [];

        $http
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/Spain.json?country=us&access_token=pk.eyJ1IjoibWp0ciIsImEiOiJjajNhOTBicWgwMDNqMzhsdzBsZ3JpNzExIn0.jbbfuU8l2LplqSooVeLlHQ")
            .then(function(response) {

                console.log("Datos progweb cogidos correctamente");

                for (var i = 0; i < 5; i++) {
                    var x = response.data.features[i];
                    //category.push(x.properties.category);
                    console.log(x)
                    if (Number(x.center[0]) >= 0) {
                        allData.push(Number(x.center[0]))
                        datastring.push(String(x.center[0]));
                    }
                    if (Number(x.center[1]) >= 0) {
                        allData.push(Number(x.center[1]))
                        names.push(String(x.text));
                        datastring.push(String(x.center[1]));

                    }


                }
                console.log(allData);

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var y = response.data[i];
                            if (!aux.includes(y.country)) {
                                allData.push(Number(y["number-of-rape"]) / 100)
                                rapes.push(Number(y["number-of-rape"]) / 100);
                                datastring.push(String(y["number-of-rape"] / 100))
                                names.push(y.country);
                                aux.push(y.country);

                            }


                        }

                        console.log(allData);
                        console.log(names)
                        new RGraph.SVG.Pie({
                            id: 'progweb1',
                            data: allData,
                            options: {
                                tooltipsEvent: 'mousemove',
                                highlightStyle: 'outline',
                                labelsSticksHlength: 50,
                                tooltips: datastring,
                                key: names
                            }
                        }).draw();


                    });

            });

    }]);
