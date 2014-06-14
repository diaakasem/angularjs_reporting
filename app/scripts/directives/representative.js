'use strict';
(function() {
    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(element, data) {

        $(element).highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Representatives Sales'
            },
            subtitle: {
                //text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: _(data).pluck('sales_rep').compact().pluck('name').value()
            },
            yAxis: [{
                labels: {
                    format: '${value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Amount',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Count',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
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
                name: "Amount",
                type: 'column',
                data: _.pluck(data, 'amount')
            }, {
                name: "Count",
                type: 'line',
                data: _.pluck(data, 'count'),
                yAxis: 1
            }]
        });

    }

    function controller(scope, element, Datautils) {

        Datautils.loadAll(function(combined) {

            var graphData = _(combined).groupBy(function(d) {
                return d.sales_rep.id;
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                return {rep: v.sales_rep, amount: amount, count: v.length};
            }).sortBy('amount').value();

            onDataLoad(element, graphData);
        });
    }

    angular.module('angularjsReportingApp')
    .directive('representative', function () {
        return {
        template: '<div></div>',
        restrict: 'E',
            controller: ['$scope', '$element', 'Datautils', controller]
        };
    });

}).call(null);
