'use strict';

describe('Controller: SoundcloudCtrl', function () {

  // load the controller's module
  beforeEach(module('robitApp'));

  var SoundcloudCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SoundcloudCtrl = $controller('SoundcloudCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
