'use strict';

angular.module('robitApp')
	.directive('rbInstagram', function (InstagramFeed) {

		return {
			templateUrl: 'views/partials/instagram-feed.tpl.html',
			restrict: 'A',
			controller: function ($scope, $element, $attrs) {

				$scope.photos = [];

				$scope.getPhotos = function () {
					InstagramFeed.getPhotos().then(function (data) {
						_.each(data.data, function (item, i) {
							var caption = (item.caption && item.caption.text ? item.caption.text : null),
								permalink = item.link,
								thumbnail_url = item.images.thumbnail.url,
								standard_url = item.images.standard_resolution.url,
								low_url = item.images.low_resolution.url,
								likes_count = (item.likes ? item.likes.count : null),
								date = item.created_time;

							var photo = {permalink: permalink, url: low_url};
							$scope.photos.push(photo);
						});
						$scope.photos = $scope.photos.slice(0,8);
					});

				};

			},
			link: function postLink($scope, element, attrs) {
				$scope.getPhotos();
			}
		};
	});
