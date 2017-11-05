/*global require, module*/
'use strict';

let notesCtrl = require('../controllers/notes-server-controller');


module.exports = (app) =>{

	app.get('/notes',notesCtrl.getNotes);
	app.put('/notes',notesCtrl.saveNotes);

};