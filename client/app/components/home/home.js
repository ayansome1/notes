'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('notesApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', '$uibModal', 'COLORS', function($scope, $http, baseUrl, $rootScope, $state, $uibModal, COLORS) {

		$scope.colorOptions = COLORS;

		function getNotes() {

			$http.get(baseUrl + "/notes").then(response => {
					console.log(response.data);
					$scope.allNotes = response.data;
				})
				.catch(response => {
					console.log(response);
				});
		}

		let noteModal;
		$scope.openNoteModal = (isNew, note) => {

			if (isNew) {
				$scope.editNote = {};
				$scope.isNewNote = true;
			} else {
				console.log(note);
				$scope.editNote = note;
				$scope.isNewNote = false;
			}

			noteModal = $uibModal.open({
				templateUrl: 'components/home/edit-note.html',
				scope: $scope,
				size: 'md'
			});
		};

		$scope.closeNoteModal = () => {
			noteModal.close();
		};

		getNotes();

		$scope.saveNote = (note) => {

			if ($scope.isNewNote) {
				$http.post(baseUrl + "/notes", {
						data: note
					}).then(() => {
						noteModal.close();
						getNotes();
					})
					.catch(response => {
						$scope.showError("Failed to create new note", response.data);
					});
			} else {
				$http.put(baseUrl + "/notes", {
						data: note
					}).then(() => {
						noteModal.close();
						getNotes();
					})
					.catch(response => {
						$scope.showError("Failed to save note", response.data);
					});
			}

			// console.log("jvhvhjv",note);
		};


	}]);