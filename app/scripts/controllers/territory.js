'use strict';

(function() {

    function controller($scope, $routeParams) {
        $scope.region = $routeParams.region;
    }

    angular.module('angularjsReportingApp').controller('TerritoryCtrl', controller);

}).call(null);
