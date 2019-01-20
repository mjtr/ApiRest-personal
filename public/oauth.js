/*global angular*/

angular.module("managerApp").controller("oauthCtrl", ["$scope", "$http", function($scope, $http) {

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display","one");
    $(".data").css("display","block");
    $("#pic").attr('src', profile.getImageUrl());
    $("email").text(profile.getEmail());

    //console.log('ID: ' + profile.getId());
    //console.log('Name: ' + profile.getName());
    //console.log('Image URL: ' + profile.getImageUrl());
    //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("you have been succesfully  signed out");
      $(".g-signin2").css("display","one");
      $(".data").css("display","none");
      console.log('User signed out.');
    });
}

}]);
