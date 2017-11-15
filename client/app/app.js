'use strict';
/*global angular,noty*/

var app = angular.module('notesApp', ['ui.router','ngAnimate','ui.bootstrap','ngTouch','tb-color-picker','angularMoment']);

app.run(['$rootScope', function ($rootScope) {

	$rootScope.showSuccess = function (msg) {

		var $layout = 'topRight';
		noty({
			theme: 'urban-noty',
			text: msg,
			type: 'success',
			timeout: 3000,
			layout: $layout,
			closeWith: ['button', 'click'],
			animation: {
				open: 'in',
				close: 'out',
				easing: 'swing'
			},
		});
	};

	$rootScope.showError = function (error, msg) {
		var content = '';
		if (error && error.stack) {
			content = error.stack;
		} else if (typeof (error) === 'object') {
			content = JSON.stringify(error);
		} else {
			content = error;
		}

		if (msg) {
			content += '<br>' + msg;
		}
		
		var $layout = 'top';
		noty({
			theme: 'urban-noty',
			text: 'Error : ' + content,
			type: 'error',
			timeout: 3000,
			layout: $layout,
			closeWith: ['button', 'click'],
			animation: {
				open: 'in',
				close: 'out',
				easing: 'swing'
			},
		});
	};

}]);
 
app.constant('baseUrl', 'http://localhost/notes/api');
app.constant('COLORS',['transparent','#FF8A80', '#FFD180', '#FFFF8D', '#CFD8DC', '#80D8FF', '#A7FFEB', '#CCFF90']);