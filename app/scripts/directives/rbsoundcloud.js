'use strict';

angular.module('robitApp')
	.directive('rbSoundcloud', function (Soundcloud, $log, $sce) {

		return {
			templateUrl: 'views/partials/soundcloud.tpl.html',
			restrict: 'A',
			controller: function ($scope, $element, $attrs) {

				$scope.iframeUrls = [];

				$scope.getTracks = function (config) {
					config = config || {};

					Soundcloud.getTracks(config).then(function (data) {

						$log.debug('Soundcloud data:', data);

						_.each(data, function (item, i) {
							$log.debug('Item:', item);
							var autoplay = false;
							$scope.iframeUrls.push($sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=' + encodeURIComponent(item.uri) + '&amp;color=000000&amp;auto_play=' + autoplay + '&amp;show_artwork=false'));
						});

					});
				}
			},
			link: function postLink($scope, element, attrs) {
				$scope.getTracks({username: attrs.username});
			}
		};
	});
