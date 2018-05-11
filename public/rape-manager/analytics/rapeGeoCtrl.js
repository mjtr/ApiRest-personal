/*global angular*/
/*global google*/
angular
    .module("managerApp")
    .controller("rapeGeoCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Rape Geo Controller is okey");



 $http                                       
        .get("/api/v2/rape-stats")
        .then(function(response){
        


      google.charts.load('current',{
          
          'packages':['geochart'],
          'mapsApiKey':"AIzaSyA1bJy3-izX-sAe6r3-6LC_yTTQfoJ-5tU"
          
      });
    
      google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {

                    var Datalist= [ 
                        ['Country','Total','Rate']
                    ];
                    response.data.forEach(function(data) {
                        Datalist.push([data.country, Number(data["total-since-two-thousand"]),
                        Number(data.rate)]);
                    });

                    var data = google.visualization.arrayToDataTable(Datalist);

                    var options = {
                        region: 150,
                        //CONSULTAR: https://developers.google.com/chart/interactive/docs/gallery/geochart
                        //displayMode: 'markers',
                        colorAxis: {
                            colors: ['green', 'red']
                        }
                        
                    };

                    var chart = new google.visualization.GeoChart(
                        document.getElementById('rapeGoogleDiv'));

                    chart.draw(data, options);
      
                }
        });
}]);