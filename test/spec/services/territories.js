'use strict';

describe('Service: Territories', function () {

  // load the service's module
  beforeEach(module('angularjsReportingApp'));

  // instantiate service
  var Territories;
  beforeEach(inject(function (_Territories_) {
    Territories = _Territories_;
  }));

  it('should do something', function () {
    expect(!!Territories).toBe(true);
  });

});
