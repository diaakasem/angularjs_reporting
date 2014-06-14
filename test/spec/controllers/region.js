'use strict';

describe('Controller: RegionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsReportingApp'));

  var RegionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegionCtrl = $controller('RegionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
