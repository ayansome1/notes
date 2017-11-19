/*global require, module*/
'use strict';

let loginCtrl = require('../controllers/login-server-controller');


module.exports = (app) =>{

	app.post('/login',loginCtrl.logIn);

};