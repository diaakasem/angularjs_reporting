'use strict';

angular.module('angularjsReportingApp')
  .directive('territory', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the territory directive');
      }
    };
  });
