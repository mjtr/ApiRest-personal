/* global angular */
//Creación del módulo rapemanagerapp 
angular.module("managerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/", {
            
           templateUrl: "/home.html" 
            
        }).when("/api/v1/rape-stats",{
            
            templateUrl: "/rape-manager/front-end/normal/rapeList.html",
            controller: "rapeListCtrl"
            
        }).when("/api/v1/rape-stats/edit/:country/:year", {
            
            templateUrl: "/rape-manager/front-end/normal/rapeEdit.html",
            controller: "rapeEditCtrl"
            
        }).when("/api/v1/secure/rape-stats",{
            
            templateUrl: "/rape-manager/front-end/secure/rapeSecureList.html",
            controller: "rapeSecureListCtrl"
            
            
        }).when("/api/v1/secure/rape-stats/edit/:country/:year", {
            
            templateUrl: "/rape-manager/front-end/secure/rapeSecureEdit.html",
            controller: "rapeSecureEditCtrl"
            
        })
        
        
        
        
        ;
    
}) ;