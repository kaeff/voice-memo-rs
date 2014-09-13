'use strict';

/**
 * @ngdoc overview
 * @name voiceMemoRsApp
 * @description
 * # voiceMemoRsApp
 *
 * Main module of the application.
 */
angular
  .module('voiceMemoRsApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
