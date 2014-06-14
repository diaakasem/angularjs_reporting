'use strict';

(function() {

    function controller($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
    angular.module('angularjsReportingApp').controller('RegionCtrl', controller);

}).call(null);
