'use strict';

describe('Controller: RepresentativeDealsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsReportingApp'));

  var RepresentativeDealsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepresentativeDealsCtrl = $controller('RepresentativeDealsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
