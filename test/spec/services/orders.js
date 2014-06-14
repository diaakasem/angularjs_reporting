'use strict';

describe('Service: Orders', function () {

    // load the service's module
    beforeEach(module('angularjsReportingApp'));

    // instantiate service
    var Orders;
    beforeEach(inject(function (_Orders_) {
        Orders = _Orders_;
    }));

    it('should exist', function () {
        expect(Orders).toBeDefined();
    });

});
