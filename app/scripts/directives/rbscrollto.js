'use strict';

angular.module('robitApp').directive('rbScrollTo', function () {
	return function (scope, element, attrs) {
		angular.element(element).bind('click', function (event) {
			event.preventDefault();
			$(document.body).animate({
				scrollTop: $(attrs.href).offset().top - $('.navbar-default').height()
			}, 500);
		});
	}
});
