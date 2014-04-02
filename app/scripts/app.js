'use strict';

angular.module('robitApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ui.bootstrap',
		'ui.map',
		'ui.event'
	])
	.config(function ($routeProvider, $logProvider, $httpProvider, $locationProvider) {
		$logProvider.debugEnabled(true);
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	});

function onGoogleReady() {
	angular.bootstrap(document.body, ['robitApp']);
}
