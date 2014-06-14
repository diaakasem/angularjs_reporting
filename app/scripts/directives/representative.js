'use strict';
(function() {
    var Months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    function onDataLoad(element, data, onClick) {

        var names =  _(data).pluck('rep').compact().map(function(d) {
            return d.first_name + ' ' + d.last_name;
        }).value()

        $(element).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Representatives Sales'
            },
            subtitle: {
                //text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: names,
                labels: {
                    rotation: 65,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
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
                name: "Revenue",
                type: 'column',
                data: _.pluck(data, 'amount'),
                point: {
                    events: {
                        click: function(d) {
                            var rep = this.category;
                            onClick(rep);
                        }
                    }
                }
            }, {
                name: "Count",
                type: 'line',
                data: _.pluck(data, 'count'),
                yAxis: 1,
                point: {
                    events: {
                        click: function(d) {
                            var rep = this.category;
                            onClick(rep);
                        }
                    }
                }
            }]
        });

    }

    function controller(scope, location, element, Datautils) {

        function onClick(rep) {
            scope.$apply(function() { 
                location.path('/representative/' + rep);
            });
        }

        Datautils.loadAll(function(combined) {

            var graphData = _(combined).groupBy(function(d) {
                return d.sales_rep.id;
            }).map(function(v, k) {
                var amount = _.reduce(v, function(sum, order){ 
                    return sum + order.amount;
                }, 0)

                var singleItem = _.first(v);
                if (!singleItem) {
                    return null;
                }

                return {rep: v[0].sales_rep, amount: amount, count: v.length};
            }).compact().sortBy('amount').value();

            onDataLoad(element, graphData, onClick);
        });
    }

    angular.module('angularjsReportingApp')
    .directive('representative', function () {
        return {
        template: '<div></div>',
        restrict: 'E',
            controller: ['$scope', '$location', '$element', 'Datautils', controller]
        };
    });

}).call(null);
