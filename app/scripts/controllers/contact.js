'use strict';

angular.module('robitApp')
	.controller('ContactCtrl', function ($scope, $http, $log, POSTMARK) {
		$scope.success = false;
		$scope.error = false;

		$scope.send = function () {

			var htmlBody = '<div>Name: ' + $scope.msg.name + '</div>' +
						   '<div>Email: ' + $scope.msg.email + '</div>' +
						   '<div>Message: ' + $scope.msg.body + '</div>' +
						   '<div>Date: ' + (new Date()).toString() + '</div>';

			var textBody = 'Name: ' + $scope.msg.name + '\n' +
				'Email: ' + $scope.msg.email + '\n' +
				'Message: ' + $scope.msg.body + '\n' +
				'Date: ' + (new Date()).toString() + '\n';

			$log.debug('Send action called.');

			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

			var url = 'https://api.postmarkapp.com/email';

			var data = {
				'From': 'm@moogs.io',
				'To': 'official.robit@gmail.com',
				'ReplyTo' : $scope.msg.email,
				'Cc' : 'hello@miguelmota.com',
				'HtmlBody': htmlBody,
				'TextBody': textBody,
				'Subject': 'New Contact Form Submission'
			};

			var headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': POSTMARK.serverToken
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
