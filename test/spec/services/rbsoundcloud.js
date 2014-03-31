'use strict';

describe('Service: Rbsoundcloud', function () {

  // load the service's module
  beforeEach(module('robitApp'));

  // instantiate service
  var Rbsoundcloud;
  beforeEach(inject(function (_Rbsoundcloud_) {
    Rbsoundcloud = _Rbsoundcloud_;
  }));

  it('should do something', function () {
    expect(!!Rbsoundcloud).toBe(true);
  });

});
