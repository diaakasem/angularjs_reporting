'use strict';

describe('Service: Datasource', function () {

    // load the service's module
    beforeEach(module('angularjsReportingApp'));

    // instantiate service
    var Datasource, Utils;
    beforeEach(inject(function (_Datasource_, _Utils_) {
        Datasource = _Datasource_;
        Utils = _Utils_;
    }));

    it('should exist', function () {
        expect(Datasource).toBeDefined();
    });

    var Orders; 
    describe("load", function() {

        beforeEach(function() {
            Orders = Datasource.init('data/Orders.csv', Utils);
        });

        it('should exist', function() {
            expect(angular.isFunction(Orders.load)).toBe(true);
        });

        it('should call d3.csv with correct path', function() {
            spyOn(d3, 'csv');
            Orders.load();
            expect(d3.csv).toHaveBeenCalledWith('data/Orders.csv', jasmine.any(Function), jasmine.any(Function));
        });

    });

    describe("get", function() {

        it('should exist', function() {
            expect(angular.isFunction(Orders.get)).toBe(true);
        });

        it('should find the correct order', function() {
            Orders.data = [
            {Id: 1, name: "blah"},
            {Id: 2, name: "blah2"}
        ];

        var res = Orders.get("blah", "name");
        expect(res[0].Id).toEqual(1);
        });
    });

});
