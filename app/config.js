'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', [])

  // version of this seed app is compatible with angularFire 2.x.x
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  .constant('version', '2.0.0')

  // where to redirect users if they need to authenticate (see security.js)
  .constant('loginRedirectPath', '/login')

  // your Firebase data URL goes here, no trailing slash
  //.constant('FBURL', 'https://friendlychat-4d74f.firebaseio.com')

  // double check that the app has been configured before running it and blowing up space and time
  .run(['$timeout', function($timeout) {
    if( PRIVATE.firebase_databaseURL.match('https://INSTANCE.firebaseio.com') ) {
      angular.element(document.body).html('<h1>Please configure app/private.js before running!</h1>');
      $timeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
  }]);
