'use strict';

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
