'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */
let config = require('./config/config.json');
let express = require('express');
let http = require('http');
let cors = require('cors');
let passport = require('passport');
let app = express();
let session = require('express-session');

//https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
//Using body parser allows you to access req.body from within your routes
let bodyParser = require('body-parser');

let MySQLStore = require('express-mysql-session')(session);
const pool = require('./lib/mysql-db-pool');

let sessionStore = new MySQLStore({},pool);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());