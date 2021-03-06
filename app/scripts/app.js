'use strict';

angular
  .module('angularjsReportingApp', [
    'ngRoute',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/monthly', {
        templateUrl: 'views/monthly.html',
        controller: 'MonthlyCtrl'
      })
      .when('/representative', {
        templateUrl: 'views/representative.html',
        controller: 'RepresentativeCtrl'
      })
      .when('/region', {
        templateUrl: 'views/region.html',
        controller: 'RegionCtrl'
      })
      .when('/territory', {
        templateUrl: 'views/territory.html',
        controller: 'TerritoryCtrl'
      })
      .when('/territory/:region', {
        templateUrl: 'views/territory.html',
        controller: 'TerritoryCtrl'
      })
      .when('/representative/:rep', {
        templateUrl: 'views/representative/deals.html',
        controller: 'RepresentativeDealsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
