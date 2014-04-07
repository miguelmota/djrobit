'use strict';

angular.module('robitApp')
  .directive('rbSoundcloudPlaylist', function () {
    return {
		templateUrl: 'views/partials/soundcloud-playlist.tpl.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
