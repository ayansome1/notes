'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('notesApp')
	.controller('loginCtrl',['$scope', '$http', 'baseUrl', '$rootScope', '$state', function($scope, $http, baseUrl, $rootScope, $state) {

		$scope.baseUrl = baseUrl;

	}]);