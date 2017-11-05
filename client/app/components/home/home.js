'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('notesApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', '$uibModal', function ($scope, $http, baseUrl, $rootScope, $state, $uibModal) {

		function getNotes() {

			$http.get(baseUrl + "/notes").then((response)=> {
				console.log(response.data);
				$scope.allNotes = response.data;
			})
			.catch((response)=> {
				console.log(response);
			});
		}

		getNotes();


	}]);