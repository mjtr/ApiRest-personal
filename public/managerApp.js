/*global angular*/

angular.module("managerApp",["ngRoute", 'angularUtils.directives.dirPagination']).config(function($routeProvider){

    $routeProvider
        .when("/", {

           templateUrl: "/home.html"

        }).when("/api/v2/rape-stats",{

            templateUrl: "/rape-manager/front-end/normal/rapeList.html",
            controller: "rapeListCtrl"

        }).when("/oauth",{

            templateUrl: "/oauth.html",
            controller: "oauthCtrl"

        }).when("/api/v2/rape-stats/edit/:country/:year", {

            templateUrl: "/rape-manager/front-end/normal/rapeEdit.html",
            controller: "rapeEditCtrl"

        }).when("/api/v2/secure/rape-stats",{

            templateUrl: "/rape-manager/front-end/secure/rapeSecureList.html",
            controller: "rapeSecureListCtrl"


        }).when("/api/v2/secure/rape-stats/edit/:country/:year", {

            templateUrl: "/rape-manager/front-end/secure/rapeSecureEdit.html",
            controller: "rapeSecureEditCtrl"

        }).when("/analytics" , {

            templateUrl: "/graphics.html"

        }).when("/analytics/rape-stats/geo",{

        templateUrl: "/rape-manager/analytics/rapeGeo.html",
        controller: "rapeGeoCtrl"


        }).when("/analytics/rape-stats/high", {

           templateUrl: "/rape-manager/analytics/rapeHigh.html",
           controller: "rapeHighCtrl"


        }).when("/analytics/rape-stats/rgraph",{

            templateUrl: "/rape-manager/analytics/rapeRGraph.html",
            controller: "rapeRGraphCtrl"

        }).when("/analytics/proxyRD",{

            templateUrl: "/rape-manager/analytics/integrations/proxyRD.html",
            controller: "proxyRDCtrl"

        }).when("/analytics/normalRW",{

            templateUrl: "/rape-manager/analytics/integrations/normalRW.html",
            controller: "normalRWCtrl"

        }).when("/analytics/mashape1",{

            templateUrl: "/rape-manager/analytics/integrations/mashape1.html",
            controller: "mashape1Ctrl"

        }).when("/analytics/mashape2",{

            templateUrl: "/rape-manager/analytics/integrations/mashape2.html",
            controller: "mashape2Ctrl"

        }).when("/analytics/progweb1",{

            templateUrl: "/rape-manager/analytics/integrations/ProgWeb1.html",
            controller: "ProgWeb1Ctrl"

        }).when("/analytics/progweb2",{

            templateUrl: "/rape-manager/analytics/integrations/ProgWeb2.html",
            controller: "ProgWeb2Ctrl"

        });




}) ;
