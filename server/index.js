'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */
let config = require('./config/config.json');
let express = require('express');
let app = express();
let http = require('http');
let cors = require('cors');

//https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
//Using body parser allows you to access req.body from within your routes
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cors({
    origin: [config.notes.corsorigin],
    credentials: true
}));

if (!process.env.NODE_ENV) {
    app.use(require('morgan')('dev'));
}

let notesRoutes = require('./routes/notes-server-routes.js');
notesRoutes(app);

var server = http.createServer(app);

server.listen(config.notes.port);

