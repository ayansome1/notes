'use strict';

/*jshint node:true*/
/* global process, console, exports:true, module */

var environment = process.env.NODE_ENV;
console.log(environment);
var config;
if (environment === 'production') {
	console.log("production");
	config = require('./config_prod.json');
} else if (environment === 'staging') {
	console.log("staging");
	config = require('./config_test.json');
} else {
	console.log("local");
	config = require('./config.json');
}

exports = module.exports = config;