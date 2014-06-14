'use strict';

(function() {

    function controller($scope) {
        $scope.grouped = false;
    }

    angular.module('angularjsReportingApp').controller('MonthlyCtrl', controller);

}).call(null);
