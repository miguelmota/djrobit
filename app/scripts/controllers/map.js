'use strict';

angular.module('robitApp')
	.controller('MapCtrl', function ($scope, $timeout) {

		$scope.model = { myMap: undefined };

		var center = new google.maps.LatLng(34.056346, -118.234578);

		$scope.mapOptions = {
			center: center,
			zoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		$scope.myMarkers = [];

		$timeout(function() {
			$scope.myMarkers.push(new google.maps.Marker({
				map: $scope.model.myMap,
				position: center
			}));
		});

	});
