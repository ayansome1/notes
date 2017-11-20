'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('notesApp')
	.controller('notesCtrl', ['Auth','$scope', '$http', 'baseUrl', '$rootScope', '$state', 
		function(Auth, $scope, $http, baseUrl, $rootScope, $state) {

		$scope.logout = function() {
			Auth.logout().then(function(isLoggedOut) {
				if (isLoggedOut) {
					$state.go('login');
				}
			}, function(err) {
				console.log(err);
			});
		};


	}]);