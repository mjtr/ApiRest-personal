/*global angular*/
/*global AmCharts*/
angular
    .module("managerApp")
    .controller("beersCtrl", ["$http", "$scope", function($http, $scope) {

        var conjunto1 = [];
        var conjunto2 = [];
        var totalRapes = 0;
        var atenuation = 0;
        var rates = 0;
        var rapes = 0;
        var ebc = 0;
        var fg = 0;

        var url = "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6";
        $http
            .get(url)
            .then(function(response) {

                for (var j = 0; j < response.data.length; j++) {
                    var y = response.data[j];
                    conjunto1.push(y.attenuation_level);
                    atenuation = atenuation + y.attenuation_level;
                    ebc = ebc + y.ebc;
                    fg = fg + y.target_fg;
                }

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var x = response.data[i];
                            conjunto2.push(x["number-of-rape"] / 100);
                            totalRapes = totalRapes + x['total-since-two-thousand'];
                            rates = rates + x.rate;
                            rapes = rapes + x["number-of-rape"];

                        }

                        console.log(conjunto1);
                        console.log("");
                        console.log(conjunto2);
                        console.log(atenuation)


                        var chart = AmCharts.makeChart("beersId", {
                            "type": "funnel",
                            "theme": "light",
                            "dataProvider": [{
                                "title": "Total Rapes since two thousand (*100):",
                                "value": totalRapes / 100
                            }, {
                                "title": "attenuation_level",
                                "value": atenuation
                            }, {
                                "title": "Total rates",
                                "value": rates
                            }, {
                                "title": "total beer ebc",
                                "value": ebc
                            }, {
                                "title": "rapes (*100)",
                                "value": rapes / 100
                            }, {
                                "title": "beer fg(*10)",
                                "value": fg / 10
                            }],
                            "balloon": {
                                "fixedPosition": true
                            },
                            "valueField": "value",
                            "titleField": "title",
                            "marginRight": 240,
                            "marginLeft": 50,
                            "startX": -500,
                            "rotate": true,
                            "labelPosition": "right",
                            "balloonText": "[[title]]: [[value]]n[[description]]",
                            "export": {
                                "enabled": true
                            }
                        });

                    });

            });

    }]);
