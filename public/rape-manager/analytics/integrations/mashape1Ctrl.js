/*global angular*/
/*global RGraph*/

angular
    .module("managerApp")
    .controller("mashape1Ctrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        var totalRape = 0;

        //Variables de la API a integrar zipf
        var perMillion1;
        var perMillion2;

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

            });

        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                    totalRape = totalRape + Number(x["number-of-rape"] / 100);
                }

            });

        $http(mashape2)
            .then(function(response) {
                console.log(response.data);
                var k = response.data;

                perMillion2 = k.frequency.perMillion;

                console.log(perMillion1);

                new RGraph.Bar({
                    id: 'mashape1',
                    data: [
                        [perMillion1, perMillion2, totalRape]
                    ],
                    options: {
                        textAccessible: true,
                        variant: '3d',
                        variantThreedAngle: 0.3,
                        strokestyle: 'rgba(0,0,0,0)',
                        colors: ['Gradient(#fbb:red)', 'Gradient(#bfb:green)', 'Gradient(#bbf:blue)'],
                        gutterTop: 5,
                        gutterLeft: 5,
                        gutterRight: 15,
                        gutterBottom: 50,
                        labels: ['Numbers of use words and number of rapes'],
                        shadowColor: '#ccc',
                        shadowOffsetx: 3,
                        backgroundGridColor: '#eee',
                        scaleZerostart: true,
                        axisColor: '#ddd',
                        unitsPost: '',
                        title: 'Numbers of authors and rapes % compare',
                        key: ['OK word usage per million ', 'death word usage per million', 'total rapes *100 '],
                        keyShadow: true,
                        keyShadowColor: '#ccc',
                        keyShadowOffsety: 0,
                        keyShadowOffsetx: 3,
                        keyShadowBlur: 15
                    }
                }).draw();
            });
    }]);
