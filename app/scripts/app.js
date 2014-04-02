'use strict';

angular
	.module('robitApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ui.bootstrap'
	])
	.config(function ($routeProvider, $logProvider, $httpProvider) {
		$logProvider.debugEnabled(true);
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
