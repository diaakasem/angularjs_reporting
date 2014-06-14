'use strict';

describe('Service: Representatives', function () {

  // load the service's module
  beforeEach(module('angularjsReportingApp'));

  // instantiate service
  var Representatives;
  beforeEach(inject(function (_Representatives_) {
    Representatives = _Representatives_;
  }));

  it('should do something', function () {
    expect(!!Representatives).toBe(true);
  });

});
