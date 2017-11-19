'use strict';
/*jshint node:true, quotmark:false*/
/*global angular*/
angular.module('AuthServices', ['ngStorage'])
    .factory('Auth',[ '$rootScope', '$sessionStorage', '$q', '$http', 'baseUrl', function ($rootScope, $sessionStorage, $q, $http, baseUrl) {

        var auth = {};

        auth.checkLoggedIn = function () {
            // Initialize a new promise 
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in 
            $http.get(baseUrl + '/loggedin').success(function (user) {
                // Authenticated 
                if (user) {
                    $sessionStorage.user = user;
                    $rootScope.user = $sessionStorage.user;
                    deferred.resolve(true);
                }
                // Not Authenticated 
                else {
                    $rootScope.message = 'You need to log in.';
                    deferred.resolve(false);
                    // $location.url('/login');
                }
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        auth.logout = function () {
            var deferred = $q.defer();
            $http.get(baseUrl + '/logout').success(function () {
                delete $sessionStorage.user;
                delete $rootScope.user;
                deferred.resolve(true);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };     

        auth.currentUser = function () {
            return $sessionStorage.user;
        };

        auth.isLoggedIn = function () {
            var deferred = $q.defer();
            auth.checkLoggedIn().then(function (loggedIn) {
                deferred.resolve(loggedIn);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        return auth;
    }]);