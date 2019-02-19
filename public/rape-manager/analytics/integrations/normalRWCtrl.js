/*global angular*/
/*global AmCharts*/

angular
    .module("managerApp")
    .controller("normalRWCtrl", ["$http", "$scope", function($http, $scope) {

        var conjunto1 = [];
        var conjunto2 = [];
        var datas = [];
        var names = [];
        $http
            .get("https://sos1718-05.herokuapp.com/api/v1/world-stats")
            .then(function(response) {

                for (var j = 0; j < response.data.length; j++) {
                    var y = response.data[j];
                    conjunto1.push([y.year, y.sale]);
                    datas.push([y.album, Number(y.sale)]);
                }
                console.log(datas);
                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var x = response.data[i];


                            if (!names.includes(x.country)) {
                                names.push(x.country);
                                conjunto2.push([x.year, x["total-since-two-thousand"] / 1000]);
                                datas.push([x.country, parseFloat(x["number-of-rape"] / 100)]);
                            }

                        }

                        console.log(datas);

                        var chart = AmCharts.makeChart("NormalRW", {
                            "type": "pie",
                            "theme": "light",
                            "dataProvider": [{
                                "title": datas[0][0],
                                "value": datas[0][1]
                            }, {
                                "title": datas[1][0],
                                "value": datas[1][1]
                            }, {
                                "title": datas[2][0],
                                "value": datas[2][1]
                            }, {
                                "title": datas[3][0],
                                "value": datas[3][1]
                            }, {
                                "title": datas[4][0],
                                "value": datas[4][1]
                            }, {
                                "title": datas[5][0],
                                "value": datas[5][1]
                            }, {
                                "title": datas[6][0],
                                "value": datas[6][1]
                            }, {
                                "title": datas[7][0],
                                "value": datas[7][1]
                            }, {
                                "title": datas[8][0],
                                "value": datas[8][1]
                            }, {
                                "title": datas[9][0],
                                "value": datas[9][1]
                            }, {
                                "title": datas[10][0],
                                "value": datas[10][1]
                            }, {
                                "title": datas[11][0],
                                "value": datas[11][1]
                            }, {
                                "title": datas[12][0],
                                "value": datas[12][1]
                            }, {
                                "title": datas[13][0],
                                "value": datas[13][1]
                            }, {
                                "title": datas[14][0],
                                "value": datas[14][1]
                            }, {
                                "title": datas[15][0],
                                "value": datas[15][1]
                            }, {
                                "title": datas[16][0],
                                "value": datas[16][1]
                            }],
                            "titleField": "title",
                            "valueField": "value",
                            "labelRadius": 5,

                            "radius": "42%",
                            "innerRadius": "60%",
                            "labelText": "[[title]]",
                            "export": {
                                "enabled": true
                            }
                        });

                    });

            });

    }]);
