'use strict';
/*global angular,noty, console*/

angular.module('notesApp')

.run(['$rootScope', '$state', '$stateParams', 'Auth', '$location', 'baseUrl', '$localStorage',
 function($rootScope, $state, $stateParams, Auth, $location, baseUrl, $localStorage) {

	// $rootScope.$state = $state;
	// $rootScope.$stateParams = $stateParams;
	// $rootScope.location = $location;
	// $rootScope.baseUrl = baseUrl;

	$rootScope.$on('$stateChangeStart', function(event, next) {
		Auth.isLoggedIn().then(function(hasAuth) {
			if (!hasAuth) {
				event.preventDefault();
				return $state.go('login');
			} else if (next.name === 'login') {
				event.preventDefault();
				return $state.go('/');
			}
			return;
		}, function(err) {
			console.log(err);
		});
	});
	$rootScope.$on('$stateChangeSuccess', function () {
	    window.scrollTo(0, 0);
	});

}])



.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider) {


		$httpProvider.interceptors.push(function($q, $location) {
			return {
				responseError: function(response) {
					if (response.status === 401) {
						$location.url('/login');
						return $q.reject();
					}

					return $q.reject(response);
				}
			};
		});

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

	}
])

;