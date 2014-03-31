'use strict';

angular.module('robitApp')
	.directive('rbPodcast', function (PodcastFeed) {

		return {
			templateUrl: 'views/partials/podcast-feed.tpl.html',
			restrict: 'A',
			controller: function ($scope, $element, $attrs) {

				$scope.entries = [];

				$scope.getEntries = function () {
					PodcastFeed.getFeed().then(function (data) {
						$scope.entries = data.entries;
					});

				};

			},
			link: function postLink($scope, element, attrs) {
				$scope.getEntries();
			}
		};
	});
