'use strict';

(function() {

    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(element, data) {

        $(element).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Sales'
            },
            subtitle: {
                //text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: _.pluck(data, 'month')
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Sales (USD)'
                }
            },
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
                name: "Sales",
                data: _.pluck(data, 'amount')
            }]
        });

    }

    function controller(scope, element, Datautils) {

        Datautils.loadAll(function(combined) {

            var graphData = _(combined).groupBy(function(d) {
                return d.close_date.getMonth();
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                return {month: k, amount: amount};
            }).sortBy('month').map(function(d) {
                d.month = Months[d.month];
                return d;
            }).value();

            onDataLoad(element, graphData);
        });
    }

    angular.module('angularjsReportingApp')
        .directive('monthly', function () {
            return {
                template: '<div></div>',
                restrict: 'E',
                controller: ['$scope', '$element', 'Datautils', controller]
            };
        });

}).call(null);
