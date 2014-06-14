'use strict';

(function() {


    function Datasource(path, Utils) {

        this.data = [];

        this.load = function(onLoad, mapper) {
            var that = this;
            d3.csv('/' + path, Utils.trimmer, function(err, data) {
                if (err) {
                    console.log(path);
                    console.log(err);
                    throw err;
                }
                that.data = mapper ? mapper(data) : data;
                onLoad(data);
            });
        };

        this.get = function(value, key) {
            if (!key) {
                key = 'Id';
            }
            var filter = {};
            filter[key] = value;
            var result = _.filter(this.data, filter);
            return result;
        };

        return this;
    }

    function Service(Utils) {

        this.init = function(path) {
            return new Datasource(path, Utils);
        }
        return this;
    }

    angular.module('angularjsReportingApp').service('Datasource', ['Utils', Service]);

}).call(null);
