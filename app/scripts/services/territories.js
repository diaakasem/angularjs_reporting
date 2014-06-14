'use strict';

(function() {

    function Territories(Datasource) {
        return Datasource.init("data/Territories.csv");
    }

    angular.module('angularjsReportingApp').service('Territories', ['Datasource', Territories]);

}).call(null);
