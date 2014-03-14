var ngApp = angular.module('ngApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/templates/index.html',
        controller: 'IndexCtrl'
      });

    $locationProvider.html5Mode(true);
  }]);
