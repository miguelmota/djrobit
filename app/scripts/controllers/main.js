'use strict';

angular.module('robitApp')
	.controller('MainCtrl', function ($scope, $location, $anchorScroll, $timeout) {
		$scope.goToAnchor = function (id) {
			$timeout(function () {
				$location.hash(id);
				$anchorScroll();
			});
		};
	});
