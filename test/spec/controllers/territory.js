'use strict';

describe('Controller: TerritoryCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsReportingApp'));

  var TerritoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TerritoryCtrl = $controller('TerritoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
