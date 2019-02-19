/*global angular*/
/*global google*/

angular
    .module("managerApp")
    .controller("mashape1Ctrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        var country = [];
        var rapes = [];
        var rates = [];
        var total = [];

        //Variables de la API a integrar zipf
        var perMillion1;
        var perMillion2;
        var zipf1;
        var zipf2;


        var url = 'https://wordsapiv1.p.mashape.com/words/ok/frequency';
        var url2 = 'https://wordsapiv1.p.mashape.com/words/death/frequency';

        var mashape = {
            method: 'GET',
            url: url,
            headers: {
                "X-Mashape-Key": "gD0CFZrjgamshfYyL0fjaBgtlmXfp1mfzq1jsn9dtw6km09cS7", //get an api key at mashape.com
                "Accept": "application/json"
            }
        };


        var mashape2 = {

            method: 'GET',
            url: url2,
            headers: {
                "X-Mashape-Key": "gD0CFZrjgamshfYyL0fjaBgtlmXfp1mfzq1jsn9dtw6km09cS7", //get an api key at mashape.com
                "Accept": "application/json"
            }

        };

        $http(mashape)
            .then(function(response) {
                var y = response.data;
                console.log(y);
                perMillion1 = y.frequency.perMillion;
                zipf1 = y.frequency.zipf;
            });

        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                    country.push(x.country);
                    rates.push(x.rate);
                    rapes.push(parseFloat(x["number-of-rape"] / 10));
                    total.push(parseFloat(x["total-since-two-thousand"] / 100));

                }

            });



        $http(mashape2)
            .then(function(response) {
                console.log(response.data);
                var k = response.data;

                perMillion2 = k.frequency.perMillion;
                zipf2 = k.frequency.zipf;

                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        [country[0], rapes[0], rapes[0], rates[0], rates[0]],
                        [country[4], total[4], total[4], rapes[4], rapes[4]],
                        [country[2], rapes[1], rapes[1], total[1], total[1]],
                        [country[6], rapes[6], rapes[6], total[6], total[6]],
                        [country[8], total[8], total[8], rapes[8], rapes[8]],
                        [country[10], total[10], total[10], rapes[10], rapes[10]],
                        ["ok", perMillion1, perMillion1, zipf1, zipf1],
                        ["death", zipf2, zipf2, perMillion2, perMillion2]


                        // Treat the first row as data.
                    ], true);

                    var options = {
                        legend: 'none',
                        bar: { groupWidth: '100%' }, // Remove space between bars.
                        candlestick: {
                            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                            risingColor: { strokeWidth: 0, fill: '#0f9d58' } // green
                        }
                    };

                    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }







            });
    }]);
