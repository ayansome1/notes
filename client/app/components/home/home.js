'use strict';
/*jshint node:true, quotmark:false*/
/*global angular,alert,_,moment*/
angular.module('notesApp')
	.controller('homeController', ['$scope', '$http', 'baseUrl', '$rootScope', '$state', '$uibModal', 'COLORS', function($scope, $http, baseUrl, $rootScope, $state, $uibModal, COLORS) {

		$scope.colorOptions = COLORS;

		function getNotes() {

			$http.get(baseUrl + "/notes").then(response => {
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
				$scope.editNote = angular.copy(note);
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

			if (!note.color) {
				note.color = COLORS[0];
			}

			if ($scope.isNewNote) {
				$http.post(baseUrl + "/notes", {
						data: note
					}).then(() => {
						noteModal.close();
						getNotes();
						$scope.showSuccess("Note created successfully");						
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
						$scope.showSuccess("Note updated successfully");
					})
					.catch(response => {
						$scope.showError("Failed to save note", response.data);
					});
			}

		};

		$scope.deleteNote = (noteId) => {

			$http.delete(baseUrl + "/notes/" + noteId).then(() => {
					noteModal.close();
					getNotes();
					$scope.showSuccess("Note deleted successfully");
				})
				.catch(response => {
					$scope.showError("Failed to delete note", response.data);
				});

		};


	}]);