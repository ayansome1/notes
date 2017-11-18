'use strict';
/*global angular,noty*/

angular.module('notesApp')
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'components/login/login.html',
		})
		.state('app', {
			abstract: true,
			templateUrl: 'components/common/layout.html'
		})
		.state('app.home', {
			url: '/',
			templateUrl: 'components/home/home.html',
		});

}])

;