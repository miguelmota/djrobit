'use strict';

describe('Service: Podcastfeed', function () {

  // load the service's module
  beforeEach(module('robitApp'));

  // instantiate service
  var Podcastfeed;
  beforeEach(inject(function (_Podcastfeed_) {
    Podcastfeed = _Podcastfeed_;
  }));

  it('should do something', function () {
    expect(!!Podcastfeed).toBe(true);
  });

});
