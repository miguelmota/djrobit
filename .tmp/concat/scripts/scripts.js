'use strict';
angular.module('robitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
]).config([
  '$routeProvider',
  '$logProvider',
  function ($routeProvider, $logProvider) {
    $logProvider.debugEnabled(true);
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('robitApp').controller('MainCtrl', [
  '$scope',
  '$location',
  '$anchorScroll',
  function ($scope, $location, $anchorScroll) {
    $scope.scrollTo = function (id) {
      $location.hash(id);
      $anchorScroll();
    };
  }
]).controller('AboutCtrl', [
  '$scope',
  function ($scope) {
  }
]).controller('MusicCtrl', [
  '$scope',
  function ($scope) {
  }
]).controller('SocialCtrl', [
  '$scope',
  function ($scope) {
  }
]).controller('ContactCtrl', [
  '$scope',
  function ($scope) {
  }
]);
'use strict';
angular.module('robitApp').directive('rbSoundcloud', [
  'Soundcloud',
  '$log',
  '$sce',
  function (Soundcloud, $log, $sce) {
    return {
      templateUrl: 'views/partials/soundcloud.tpl.html',
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
          $scope.iframeUrls = [];
          $scope.getTracks = function (config) {
            config = config || {};
            config.clientIdDev = 'a5936f4a6e935d8695c2c6e0de46b830';
            Soundcloud.getTracks(config).then(function (data) {
              $log.debug('Soundcloud data:', data);
              _.each(data, function (item, i) {
                $log.debug('Item:', item);
                var autoplay = false;
                $scope.iframeUrls.push($sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=' + encodeURIComponent(item.uri) + '&amp;color=000000&amp;auto_play=' + autoplay + '&amp;show_artwork=false'));
              });
            });
          };
        }
      ],
      link: function postLink($scope, element, attrs) {
        $scope.getTracks({ username: attrs.username });
      }
    };
  }
]);
'use strict';
angular.module('robitApp').service('Soundcloud', [
  '$http',
  '$log',
  '$q',
  function Soundcloud($http, $log, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function getTracks(config) {
      var options = _.assign({}, config);
      var deferred = $q.defer();
      $http.get('http://api.soundcloud.com/users/' + options.username + '/tracks.json?client_id=' + options.clientIdDev).success(function (data, status, headers, config, statusText) {
        deferred.resolve(data);
      }).error(function (data, status, headers, config) {
        deferred.reject();
      });
      return deferred.promise;
    }
    return { getTracks: getTracks };
  }
]);
'use strict';
angular.module('robitApp').controller('SoundcloudCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
angular.module('robitApp').directive('rbPodcast', [
  'PodcastFeed',
  function (PodcastFeed) {
    return {
      templateUrl: 'views/partials/podcast-feed.tpl.html',
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
          $scope.entries = [];
          $scope.getEntries = function () {
            PodcastFeed.getFeed().then(function (data) {
              $scope.entries = data.entries;
            });
          };
        }
      ],
      link: function postLink($scope, element, attrs) {
        $scope.getEntries();
      }
    };
  }
]);
'use strict';
angular.module('robitApp').service('PodcastFeed', [
  '$http',
  '$q',
  '$log',
  function PodcastFeed($http, $q, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function getFeed() {
      var deferred = $q.defer();
      $http.get('http://www.djrobit.com/podcast/feed.json?callback=?').success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    }
    ;
    return { getFeed: getFeed };
  }
]);
'use strict';
angular.module('robitApp').service('InstagramFeed', [
  '$http',
  '$q',
  '$log',
  function InstagramFeed($http, $q, $log) {
    function getPhotos() {
      var deferred = $q.defer();
      var config = {
          clientId: '6ceae3f80d094a13b49e1a9d2a5451cf',
          redirectUri: 'http://localhost',
          username: 'djrobit',
          count: 9,
          accessToken: '211404734.6ceae3f.59bb5cf01d78429184eed7a20da06383',
          userId: 211404734
        };
      var url = 'https://api.instagram.com/v1/users/' + config.userId + '/media/recent?access_token=' + config.accessToken + '&count=' + config.count + 'callback=?';
      var proxyUrl = 'http://proxy.miguelmota.com/?url='.concat(encodeURIComponent(url));
      //window.open('https://instagram.com/oauth/authorize/?client_id='+config.clientId+'&redirect_uri='+config.redirectUri+'&response_type=token');
      $http.get(proxyUrl).success(function (data, status, headers, config, statusText) {
        $log.debug(data);
        deferred.resolve(data);
      }).error(function (data, status, headers, config) {
        deferred.reject();
      });
      return deferred.promise;
    }
    return { getPhotos: getPhotos };
  }
]);
;
'use strict';
angular.module('robitApp').directive('rbInstagram', [
  'InstagramFeed',
  function (InstagramFeed) {
    return {
      templateUrl: 'views/partials/instagram-feed.tpl.html',
      restrict: 'A',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
          $scope.photos = [];
          $scope.getPhotos = function () {
            InstagramFeed.getPhotos().then(function (data) {
              _.each(data.data, function (item, i) {
                var caption = item.caption && item.caption.text ? item.caption.text : null, permalink = item.link, thumbnail_url = item.images.thumbnail.url, standard_url = item.images.standard_resolution.url, low_url = item.images.low_resolution.url, likes_count = item.likes ? item.likes.count : null, date = item.created_time;
                var photo = {
                    permalink: permalink,
                    url: low_url
                  };
                $scope.photos.push(photo);
              });
              $scope.photos = $scope.photos.slice(0, 8);
            });
          };
        }
      ],
      link: function postLink($scope, element, attrs) {
        $scope.getPhotos();
      }
    };
  }
]);