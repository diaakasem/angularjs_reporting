'use strict';

describe('Controller: RepresentativeCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsReportingApp'));

  var RepresentativeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepresentativeCtrl = $controller('RepresentativeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
