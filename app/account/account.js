(function (angular) {
  "use strict";

  var app = angular.module('myApp.account', ['firebase', 'firebase.appauth', 'ngRoute']);

  app.controller('AccountCtrl', ['$scope', 'Auth', '$location', '$firebaseObject',
    function($scope, Auth, $location, $firebaseObject) {
      // create a 3-way binding with the user profile object in Firebase
      $scope.profile = Auth.$getAuth();
      console.log("firebase.User = ",JSON.stringify($scope.profile));

      // expose logout function to scope
      $scope.logout = function() {
        Auth.$signOut();
        $location.path('/login');
      };

      $scope.changePassword = function(newPass, confirm) {
        resetMessages();
        if( !confirm || !newPass ) {
          $scope.err = 'Please fill in all password fields';
        }
        else if( newPass !== confirm ) {
          $scope.err = 'New pass and confirm do not match';
        }
        else {
          Auth.$updatePassword(newPass)
            .then(function() {
              $scope.msg = 'Password changed';
            }, function(err) {
              $scope.err = err;
            })
        }
      };

      $scope.clear = resetMessages;

      $scope.changeEmail = function(newEmail) {
        resetMessages();
        Auth.$updateEmail(newEmail)
          .then(function() {
            $scope.emailmsg = 'Email changed';
          }, function(err) {
            $scope.emailerr = err;
          });
      };

      function resetMessages() {
        $scope.err = null;
        $scope.msg = null;
        $scope.emailerr = null;
        $scope.emailmsg = null;
      }
    }
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    // require user to be authenticated before they can access this page
    // this is handled by the .whenAuthenticated method declared in
    // components/router/router.js
    $routeProvider.whenAuthenticated('/account', {
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    })
  }]);

})(angular);
