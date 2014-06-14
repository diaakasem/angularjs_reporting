'use strict';

angular.module('angularjsReportingApp')
  .directive('region', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the region directive');
      }
    };
  });
