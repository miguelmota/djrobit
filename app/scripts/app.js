'use strict';

angular
	.module('robitApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ui.bootstrap'
	])
	.config(function ($routeProvider, $logProvider) {
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

