'use strict';

(function() {

    var dateFormat = d3.time.format('%d-%b-%y');
    function ordersMapper(orders) {

        return _.map(orders, function(order) { 
            var amountTrimmed = order.amount.replace('$', '').replace(',', '');
            order.amount = parseInt(amountTrimmed, 10);
            order.close_date = dateFormat.parse(order.close_date);
            return order;
        });
    }

    function Datautils(Orders, Representatives, Territories, Utils) {

        this.combined;

        this.loadAll = function(onLoad) {
            var that = this;
            if (this.combined) {
                return onLoad(this.combined);
            }
            var orders, reps, territories;
            Orders.load(function(data) {
                orders = data;
                Representatives.load(function(data) {
                    reps = data;
                    Territories.load(function(data) {
                        territories = data;
                        that.combined = Utils.combine(orders, reps, territories);
                        onLoad(that.combined);
                    });
                });
            }, ordersMapper);
        };

        return this;
    }

    angular.module('angularjsReportingApp').service('Datautils', ['Orders', 'Representatives', 'Territories', 'Utils', Datautils]);

}).call(null);
