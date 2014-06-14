'use strict';

describe('Controller: MonthlyCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsReportingApp'));

  var MonthlyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonthlyCtrl = $controller('MonthlyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
