'use strict';

describe('Service: PodcastFeed', function () {

  // load the service's module
  beforeEach(module('robitApp'));

  // instantiate service
  var Podcastfeed;
  beforeEach(inject(function (_PodcastFeed_) {
    PodcastFeed = _PodcastFeed_;
  }));

  it('should do something', function () {
    expect(!!PodcastFeed).toBe(true);
  });

});
