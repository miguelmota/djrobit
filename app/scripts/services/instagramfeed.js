'use strict';

angular.module('robitApp')
	.service('InstagramFeed', function InstagramFeed($http, $q, $log, INSTAGRAM) {

		function getPhotos() {
			var deferred = $q.defer();

			var config = {
				username: 'djrobit',
				userId: 211404734,
				count: 9,
			};

			var url = 'https://api.instagram.com/v1/users/' + config.userId + '/media/recent?access_token=' + INSTAGRAM.accessToken + '&count=' + config.count + 'callback=?';
			var proxyUrl = 'http://proxy.miguelmota.com/?url='.concat(encodeURIComponent(url));

			$http.get(proxyUrl)
				.success(function (data, status, headers, config, statusText) {
					$log.debug(data);

					deferred.resolve(data);
				}).error(function (data, status, headers, config) {
					deferred.reject();
				});

			return deferred.promise;
		}

		return {
			getPhotos: getPhotos
		};
	})
;
