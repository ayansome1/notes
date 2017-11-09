'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('notesApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', '$uibModal','COLORS', function($scope, $http, baseUrl, $rootScope, $state, $uibModal, COLORS) {

		$scope.colorOptions = COLORS;
		function getNotes() {

			$http.get(baseUrl + "/notes").then((response) => {
					console.log(response.data);
					$scope.allNotes = response.data;
				})
				.catch((response) => {
					console.log(response);
				});
		}

		let noteModal;
		$scope.openNoteModal = function(isNew) {

			if (isNew) {
				$scope.addOrEdit = 'Add';

			} else {
				$scope.addOrEdit = 'Edit';
			}

			if (isNew) {
				$scope.newNote = {};
			}

			noteModal = $uibModal.open({
				templateUrl: 'components/home/edit-note.html',
				scope: $scope,
				size: 'md'
			});
		};

		$scope.closeNoteModal = function() {
			noteModal.close();
		};

		getNotes();


	}]);