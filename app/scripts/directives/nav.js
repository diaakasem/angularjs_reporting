'use strict';
(function() {

    function controller($scope, $location) {
        $scope.selected = 'home';

        $scope.$on('$routeChangeSuccess', function(next, current) { 
            var path = $location.path();
            $scope.selected = path.split('/')[1];
        });
    }

    angular.module('angularjsReportingApp')
    .directive('nav', function () {
        return {
            templateUrl: 'views/nav.html',
            restrict: 'E',
            replace: true,
            controller: controller
        };
    });
}).call(null);
