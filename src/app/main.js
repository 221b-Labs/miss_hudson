var ngApp = angular.module('ngApp', ['ngRoute', 'firebase'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/templates/index.html',
        controller: 'IndexCtrl'
      });

    $locationProvider.html5Mode(true);
  }])
  .factory('dbService', [function() {
    var ref = new Firebase("https://glaring-fire-8324.firebaseio.com");

  return ref;
  }]);
