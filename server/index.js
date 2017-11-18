'use strict';
/* global require*/
/* global process, console */
/* jshint node: true, quotmark: false */
let config = require('./config/config.json');
let express = require('express');
let app = express();
let http = require('http');
let cors = require('cors');
let winston = require('winston');
let slacklog = require('slacklog');
let passport = require('passport');
let StrategyGoogle = require('passport-google-openidconnect').Strategy;

let googleAuthParams = {
    clientID: config.googleauth.clientid,
    clientSecret: config.googleauth.clientsecret,
    callbackURL: config.googleauth.callbackUrl
};

passport.use(new StrategyGoogle(googleAuthParams,
  function(iss, sub, profile, accessToken, refreshToken, done) {
	return done(null,profile);    
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function( user, done) {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google-openidconnect', {
    scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google-openidconnect', {
    successRedirect: config.googleauth.redirect,
    failureRedirect: config.googleauth.failureRedirect
}));

winston.add(slacklog, {
    level: 'error',
    moduleName: 'Notes'
});

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

