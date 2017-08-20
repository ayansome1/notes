'use strict';
/* global require,console*/
/* jshint node: true*/

var mysql = require('mysql');

let config = '../config/config.json';
let pool = mysql.createPool(config.sqlconn);
module.exports = pool;