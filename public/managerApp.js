/*global angular*/

angular.module("managerApp",["ngRoute", 'angularUtils.directives.dirPagination']).config(function($routeProvider){

    $routeProvider
        .when("/", {

           templateUrl: "/home.html"

        }).when("/home", {

           templateUrl: "/home.html"

        }).when("/contacto", {

           templateUrl: "/contacto.html"

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

        }).when("/integrations/rape-stats/geo", {

            templateUrl: "/rape-manager/analytics/rapeGeo.html",
            controller: "rapeGeoCtrl"


        }).when("/integrations/rape-stats/high", {

            templateUrl: "/rape-manager/analytics/rapeHigh.html",
            controller: "rapeHighCtrl"


        }).when("/integrations/rape-stats/rgraph", {

            templateUrl: "/rape-manager/analytics/rapeRGraph.html",
            controller: "rapeRGraphCtrl"

        }).when("/integrations/proxyRD", {

            templateUrl: "/rape-manager/analytics/integrations/proxyRD.html",
            controller: "proxyRDCtrl"

        }).when("/integrations/normalRW", {

            templateUrl: "/rape-manager/analytics/integrations/normalRW.html",
            controller: "normalRWCtrl"

        }).when("/integrations/mashape1", {

            templateUrl: "/rape-manager/analytics/integrations/mashape1.html",
            controller: "mashape1Ctrl"

        }).when("/integrations/mashape2", {

            templateUrl: "/rape-manager/analytics/integrations/mashape2.html",
            controller: "mashape2Ctrl"

        }).when("/integrations/progweb1", {

            templateUrl: "/rape-manager/analytics/integrations/ProgWeb1.html",
            controller: "ProgWeb1Ctrl"

        }).when("/integrations/clash", {

            templateUrl: "/rape-manager/analytics/integrations/clashApi.html",
            controller: "clashApiCtrl"

        }).when("/integrations/ghibli", {

            templateUrl: "/rape-manager/analytics/integrations/ghibli.html",
            controller: "ghibliCtrl"

        }).when("/integrations/beers", {

            templateUrl: "/rape-manager/analytics/integrations/beers.html",
            controller: "beersCtrl"



        });




}) ;
