'use strict';

describe('Directive: territory', function () {

  // load the directive's module
  beforeEach(module('angularjsReportingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<territory></territory>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the territory directive');
  }));
});
