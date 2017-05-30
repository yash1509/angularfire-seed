(function(angular) {
  "use strict";

  var app = angular.module('myApp.home', ['firebase.appauth', 'firebase', 'ngRoute']);

  app.controller('HomeCtrl', ['$scope', '$firebaseObject', 'Auth', function ($scope, $firebaseObject, Auth) {
    var ref = firebase.database().ref('syncedValue');
    $scope.syncedValue = $firebaseObject(ref);
    $scope.user = Auth.$getAuth();;
    $scope.FBURL = PRIVATE.firebase_databaseURL;
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    });
  }]);

})(angular);
