'use strict';

(function() {

    function Orders(Datasource) {
        return Datasource.init("data/Orders.csv");
    }

    angular.module('angularjsReportingApp').service('Orders', ['Datasource', Orders]);

}).call(null);
