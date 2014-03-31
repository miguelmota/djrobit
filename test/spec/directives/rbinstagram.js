'use strict';

describe('Directive: rbInstagram', function () {

  // load the directive's module
  beforeEach(module('robitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rb-instagram></rb-instagram>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rbInstagram directive');
  }));
});
