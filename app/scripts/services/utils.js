'use strict';

(function() {

    function Utils() {

        this.combine = function(orders, reps, territories) {
            _.each(reps, function(rep) {
                rep.territory = _.find(territories, {id: rep.territory});
            });
            _.each(orders, function(order) {
                order.sales_rep = _.find(reps, {id: order.sales_rep});
            });
            return orders;
        };

        this.trimmer = function (obj) {

            var newObj = {};

            _.each(obj, function(value, key) {
                key = key.trim();
                key = key.replace(" ", "_");
                key = key.toLowerCase();
                value = value.trim();

                newObj[key] = value;
            });

            return newObj;
        };

        return this;
    }

    angular.module('angularjsReportingApp').service('Utils', Utils);

}).call(null);
