'use strict';

(function() {

    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(data) {
        var options = {
            chart: {
                renderTo: 'monthly_chart',
                type: 'column'
            },
            title: {
                text: 'Monthly Sales'
            },
            subtitle: {
                //text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: _(data).sortBy('month_index').pluck('month').value()
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
                data: _(data).sortBy('month_index').pluck('amount').value()
            }]
        };

        return new Highcharts.Chart(options);

    }

    function controller(scope, element, Datautils) {

        scope.$watch('grouped', function(grouped) { 
            if (scope.chart) {
                if (grouped) {
                    var data = [0, 0, 0, 0];
                    _(scope.graphData).sortBy('month_index').each(function(d, i) { 
                        data[Math.floor(i/3)] += d.amount;
                    }).value();
                    scope.chart.series[0].update({ data: data });
                    scope.chart.xAxis[0].categories = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Forth Quarter'];
                } else {
                    scope.chart.series[0].update({
                        data: _(scope.graphData).sortBy('month_index').pluck('amount').value()
                    });
                    scope.chart.xAxis[0].categories = _(scope.graphData).sortBy('month_index').pluck('month').value();
                }
                scope.chart.series[0].isDirty = true;
                scope.chart.xAxis[0].isDirty = true;
                scope.chart.redraw();
            }
        });

        $(element).attr('id', 'monthly_chart');

        Datautils.loadAll(function(combined) {

            scope.graphData = _(combined).groupBy(function(d) {
                return d.close_date.getMonth();
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                return {month_index: parseInt(k, 10), amount: amount};
            }).sortBy('month_index').map(function(d) {
                d.month = Months[d.month_index];
                return d;
            }).value();

            scope.chart = onDataLoad(scope.graphData);
        });
    }

    angular.module('angularjsReportingApp')
        .directive('monthly', function () {
            return {
                template: '<div></div>',
                scope: {
                    grouped: '='
                },
                replace: true,
                restrict: 'E',
                controller: ['$scope', '$element', 'Datautils', controller]
            };
        });

}).call(null);
