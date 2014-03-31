'use strict';

describe('Service: Instagramfeed', function () {

  // load the service's module
  beforeEach(module('robitApp'));

  // instantiate service
  var Instagramfeed;
  beforeEach(inject(function (_Instagramfeed_) {
    Instagramfeed = _Instagramfeed_;
  }));

  it('should do something', function () {
    expect(!!Instagramfeed).toBe(true);
  });

});
