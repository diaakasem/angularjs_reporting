(function() {

    function Representatives(Datasource) {
        return Datasource.init("data/Reps.csv");
    }

    angular.module('angularjsReportingApp').service('Representatives', ['Datasource', Representatives]);

}).call(null);
