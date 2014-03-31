'use strict';

angular.module('robitApp')
	.controller('ContactCtrl', function ($scope, $http, $log) {
		$scope.success = false;
		$scope.error = false;

		$scope.send = function () {

			var htmlBody = '<div>Name: ' + $scope.msg.name + '</div>' +
						   '<div>Email: ' + $scope.msg.email + '</div>' +
						   '<div>Message: ' + $scope.msg.body + '</div>' +
						   '<div>Date: ' + (new Date()).toString() + '</div>';

			$log.debug('Send action called.');

			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

			var url = 'https://api.postmarkapp.com/email';

			var data = {
				'From': 'm@moogs.io',
				'To': 'miguelmota2@gmail.com',
				'HtmlBody': htmlBody
			};

			var headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': 'ccd40485-6a1a-4e7b-ae75-ea3762f0583e',
				'Subject': 'New Contact Form Submission'
			};

			var paramStr = $.param({url: url, data: JSON.stringify(data), headers: JSON.stringify(headers)});

			$http({
				method: 'POST',
				url: 'http://proxy.miguelmota.com',
				data: paramStr
			}).
			success(function (data) {
				console.log(data);
				$scope.success = true;
				$scope.msg = {};
			}).
			error(function (data) {
				console.log('err');
				console.log(data);
				$scope.error = true;
			});
		};
	});
