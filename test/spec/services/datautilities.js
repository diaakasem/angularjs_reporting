'use strict';

describe('Service: Datautilities', function () {

  // load the service's module
  beforeEach(module('angularjsReportingApp'));

  // instantiate service
  var Datautilities;
  beforeEach(inject(function (_Datautilities_) {
    Datautilities = _Datautilities_;
  }));

  it('should do something', function () {
    expect(!!Datautilities).toBe(true);
  });

});
