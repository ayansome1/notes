'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('notesApp')
	.controller('loginCtrl',['$scope', '$http', 'baseUrl', '$rootScope', '$state', function($scope, $http, baseUrl, $rootScope, $state) {

		$scope.baseUrl = baseUrl;
		console.log($scope.baseUrl);

		// $scope.login = function(user) {
		// 	$http.post(baseUrl + '/login', user)
		// 		.success(function() {
		// 			$rootScope.user = user;
		// 			$state.go('/');
		// 		})
		// 		.error(function() {
		// 			alert('Try again');
		// 		});
		// };
		// $rootScope.$broadcast('loggedin', true);

	}]);