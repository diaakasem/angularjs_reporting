'use strict';
(function() {
    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(element, data) {
        var names = _(data).pluck('territory').compact().pluck('territory').value();

        $(element).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Territory Sales'
            },
            subtitle: {
                //text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: names
            },
            yAxis: [{
                labels: {
                    format: '${value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Revenue',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
            }],
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: "Revenue",
                type: 'column',
                data: _.pluck(data, 'amount')
            }]
        });

    }

    function controller(scope, element, Datautils) {

        Datautils.loadAll(function(combined) {

            var graphData = _(combined).filter(function(d) {
                if (!scope.region) {
                    return true;
                }
                return d.sales_rep.territory.region === scope.region;
            }).groupBy(function(d) {
                return d.sales_rep.territory.id;
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                var singleItem = _.first(v);
                if (!singleItem) {
                    return null;
                }

                return {territory: v[0].sales_rep.territory, amount: amount, count: v.length};
            }).compact().sortBy('amount').value();

            onDataLoad(element, graphData);
        });
    }

    angular.module('angularjsReportingApp')
    .directive('territory', function () {
        return {
        template: '<div></div>',
        scope: {
            region: '@'
        },
        restrict: 'E',
            controller: ['$scope', '$element', 'Datautils', controller]
        };
    });

}).call(null);
