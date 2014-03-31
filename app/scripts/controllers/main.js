'use strict';

angular.module('robitApp')
	.controller('MainCtrl', function ($scope, $location, $anchorScroll) {
		$scope.scrollTo = function(id) {
			$location.hash(id);
			$anchorScroll();
		};
	})
	.controller('AboutCtrl', function ($scope) {

	})
	.controller('MusicCtrl', function ($scope) {

	})
	.controller('SocialCtrl', function ($scope) {

	})
	.controller('ContactCtrl', function ($scope) {

	});
