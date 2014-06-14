'use strict';
(function() {
    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(element, data) {
        var names = _.pluck(data, 'region');

        $(element).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Regions Sales'
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

            var graphData = _(combined).groupBy(function(d) {
                return d.sales_rep.territory.region;
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                var singleItem = _.first(v);
                if (!singleItem) {
                    return null;
                }

                return {region: v[0].sales_rep.territory.region, amount: amount, count: v.length};
            }).compact().sortBy('amount').value();

            onDataLoad(element, graphData);
        });
    }

    angular.module('angularjsReportingApp')
    .directive('region', function () {
        return {
        template: '<div></div>',
        restrict: 'E',
            controller: ['$scope', '$element', 'Datautils', controller]
        };
    });

}).call(null);
