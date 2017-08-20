'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */
let config = require('./config/config.json');
let express = require('express');
let http = require('http');

let passport = require('passport');
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let MySQLStore = require('express-mysql-session')(session);
const pool = require('./lib/mysql-db-pool');

let sessionStore = new MySQLStore({},pool);

app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.use(passport.initialize());
app.use(passport.session());