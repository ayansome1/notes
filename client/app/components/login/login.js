'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert*/
angular.module('notesApp')
	.controller('loginCtrl', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', function($scope, $http, baseUrl, $rootScope, $state) {

		$scope.baseUrl = baseUrl;
		$scope.slides = [{
			id: 0,
			text: "Access notes from both mobile and desktop",
			backgroundColor: 'darkred'
		}, {
			id: 1,
			text: "Prioritize notes with colors",
			backgroundColor: 'darkslateblue'

		}, {
			id: 2,
			text: "Easy login with google",
			backgroundColor: '#3E2723'
		}];

	}]);