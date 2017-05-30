angular.module('firebase.appauth', ['firebase'])
  // renamed as per 
  // https://stackoverflow.com/questions/39244924/angularfire-and-firebase-upgrade-error-unknown-provider-firebaseauthprovider#39249547
  .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    return $firebaseAuth();
  }]);
