'use strict';

describe('Directive: rbPodcast', function () {

  // load the directive's module
  beforeEach(module('robitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rb-podcast></rb-podcast>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rbPodcast directive');
  }));
});
