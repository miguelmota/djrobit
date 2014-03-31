'use strict';

angular.module('robitApp')
  .service('PodcastFeed', function PodcastFeed($http, $q, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

	function getFeed() {
		var deferred = $q.defer();

		$http.get('http://www.djrobit.com/podcast/feed.json?callback=?')
		.success(function(response) {
			deferred.resolve(response);
		})
		.error(function(response) {
			deferred.reject();
		});

		return deferred.promise;
	};

	return {
		getFeed: getFeed
	};
  });
