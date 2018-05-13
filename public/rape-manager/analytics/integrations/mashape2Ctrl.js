/*global angular*/
/*global RGraph*/

angular
    .module("managerApp")
    .controller("mashape2Ctrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        var totalRate = [];
        var year = [];

        //Variables de la API a integrar zipf
        var score1;
        var score2;
        var score3;

        var url = 'https://jamiembrown-tweet-sentiment-analysis.p.mashape.com/api/?text=happy';
        var url2 = 'https://jamiembrown-tweet-sentiment-analysis.p.mashape.com/api/?text=kiss';
        var url3 = 'https://jamiembrown-tweet-sentiment-analysis.p.mashape.com/api/?text=food';



        var mashape = {
            method: 'GET',
            url: url,
            headers: {
                "X-Mashape-Key": "9Vbx5WmJ3emshaDuYDtSsrCWGotxp1OeXyMjsnkvqcBfDa2dqI", //get an api key at mashape.com
                "Accept": "application/json"
            }
        };


        var mashape2 = {

            method: 'GET',
            url: url2,
            headers: {
                "X-Mashape-Key": "9Vbx5WmJ3emshaDuYDtSsrCWGotxp1OeXyMjsnkvqcBfDa2dqI", //get an api key at mashape.com
                "Accept": "application/json"
            }

        };

        var mashape3 = {

            method: 'GET',
            url: url3,
            headers: {
                "X-Mashape-Key": "9Vbx5WmJ3emshaDuYDtSsrCWGotxp1OeXyMjsnkvqcBfDa2dqI", //get an api key at mashape.com
                "Accept": "application/json"
            }

        };

        $http(mashape)
            .then(function(response) {
                var y = response.data;

                console.log(y);
                score1 = Number(y.score);
                console.log("score1: " + score1);
            });



        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                    year.push(Number(x.year));
                    totalRate.push(Number(x.rate ));
                }

            });

        $http(mashape2)
            .then(function(response) {
                console.log(response.data);
                var k = response.data;

                score2 =Number(k.score);
                console.log("score2: " + score2);


            });


        $http(mashape3)
            .then(function(response) {
                console.log(response.data);

                score3 = Number(response.data.score);
                console.log("score3: " + score3);

                new RGraph.SVG.Line({
                    id: 'mashape2',
                    data: [
                        [score2 *10, score1*10, score3*10],
                        totalRate
                    ],
                    options: {
                        yaxis: false,
                        backgroundGridVlines: false,
                        backgroundGridBorder: false,
                        xaxisLabels: year,
                        hmargin: 15,
                        gutterLeft: 75,
                        gutterRight: 25,
                        gutterBottom: 35,
                        yaxisUnitsPre: '$',
                        spline: true,
                        filled: true,
                        filledAccumulative: true,
                        linewidth: 0,
                        filledOpacity: 0.3,
                        title: 'Tweet Sentiment API vs rape rate stats ',
                        titleFont: 'Arial black',
                        titleItalic: true,
                        titleColor: 'gray'
                    }
                }).trace();


               
            });
    }]);
