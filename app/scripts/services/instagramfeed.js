'use strict';

angular.module('robitApp')
	.service('InstagramFeed', function InstagramFeed($http, $q, $log) {

		function getPhotos() {
			var deferred = $q.defer();

			var config = {
				clientId: '6ceae3f80d094a13b49e1a9d2a5451cf',
				//redirectUri: 'http://www.djrobit.com',
				redirectUri: 'http://localhost',
				username: 'djrobit',
				count: 9,
				accessToken: '211404734.6ceae3f.59bb5cf01d78429184eed7a20da06383',
				userId: 211404734
			};

			var url = 'https://api.instagram.com/v1/users/' + config.userId + '/media/recent?access_token=' + config.accessToken + '&count=' + config.count + 'callback=?';
			var proxyUrl = 'http://proxy.miguelmota.com/?url='.concat(encodeURIComponent(url));

			//window.open('https://instagram.com/oauth/authorize/?client_id='+config.clientId+'&redirect_uri='+config.redirectUri+'&response_type=token');

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
