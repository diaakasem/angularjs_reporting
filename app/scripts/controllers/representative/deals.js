'use strict';

(function() {

    function controller($scope, $routeParams, Datautils, ngTableParams, $filter) {
        var rep = $routeParams.rep;
        $scope.rep = rep;
        $scope.data = [];

        function onLoad(combined) {
            $scope.data = _.filter(combined, function(d) {
                var drep = d.sales_rep.first_name + ' ' + d.sales_rep.last_name ;
                return drep === rep;
            });

            try {
                $scope.tableParams.reload();
            } catch(e) {
                console.log("Reload issue");
            }
        }

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                amount: 'asc'
            }
        }, {
            total: $scope.data.length, // length of data
            scope: $scope,
            getData: function($defer, params) {
                var orderedData = params.sorting() ?
                    $filter('orderBy')($scope.data, params.orderBy()) :
                    $scope.data;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });


        Datautils.loadAll(onLoad);

    }

    angular.module('angularjsReportingApp').controller('RepresentativeDealsCtrl', controller);

}).call(null);
