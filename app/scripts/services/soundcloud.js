'use strict';

angular.module('robitApp')
    .service('Soundcloud', function Soundcloud($http, $log, $q) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        function getTracks(config) {
            var options = _.assign({}, config);
            var deferred = $q.defer();

            $http.get('http://api.soundcloud.com/users/' + options.username + '/tracks.json?client_id=' + options.clientIdDev)
                .success(function(data, status, headers, config, statusText) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject();
                });

            return deferred.promise;
        }

        return {
            getTracks: getTracks
        };
    }
);
