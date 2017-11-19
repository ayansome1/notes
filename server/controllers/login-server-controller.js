'use strict';
/* global require,module, console*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let winston = require('winston');
let moment = require('moment');

let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

function createUser(email, password, name, accessToken) {


  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);

  let today = moment().format("YYYY-MM-DD");

  let query = "insert into fdausers(email,password,username,accessToken,data) values(?,?,?,?,?);";
  let otherDoctorData = {memberSince : today};
  otherDoctorData = JSON.stringify(otherDoctorData);
  connection.query(query, [email, password, name, accessToken,otherDoctorData], function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }

  });
  connection.end();
  return deferred.promise;

}

var signUp = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  checkIfEmailAvailable(email).then(function (isEmailAvailable) {

    if (!isEmailAvailable) {
      res.status(409).send();
    } else {
      return generateAccessTokenAndCreateUser(email, password, name);
    }
  }).then(function (token) {

    let userDetails = {
      user: {
        email: email,
        name: name
      },
      accessToken: token
    };
    sendEmailToNewSignUps(email);
    // send verification mail here
    res.send(userDetails);

  }, function (err) {
    console.log(err);
    winston.error("error in user sign up" + err);
    res.status(500).send();
  });

};


function getUserData(email) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "select email,username,accesstoken, isEmailVerified from fdausers where email = ?;";
  connection.query(query, [email], function (err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(results[0]);
    }
  });
  connection.end();
  return deferred.promise;

}

function getUserDetailsWithNewAccessToken(email) {

  let deferred = q.defer();
  generateAccesToken().then(function (newAccessToken) {

    return modifyAccessTokenOfUser(email, newAccessToken);

  }).then(function () {

    return getUserData(email);

  }).then(function (userDetails) {

    deferred.resolve(userDetails);

  }, function (err) {
    deferred.reject(err);
  });

  return deferred.promise;

}

function checkLoginCredentials(email, password) {

  let deferred = q.defer();
  let connection = mysql.createConnection(connInfo);
  let query = "select email,username,accesstoken from fdausers where email = ? and password = ?;";
  var sql = connection.query(query, [email, password], function (err, results) {
    if (err) {
      deferred.reject(err);
    } else {
      if (results[0]) {
        deferred.resolve(results[0]);
      } else {
        deferred.resolve();
      }
    }

  });
  console.log(sql.sql);
  connection.end();
  return deferred.promise;

}

function validateUser(email, password) {

  let deferred = q.defer();

  getHashedPassword(password).then(function (hashedPassword) {

    return checkLoginCredentials(email, hashedPassword);

  }).then(function (userDetails) {
    if (userDetails) {
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }

  }, function (err) {

    deferred.reject(err);
  });

  return deferred.promise;

}


var logIn = (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  validateUser(email, password).then(function (isValid) {


    if (isValid) {
      return getUserDetailsWithNewAccessToken(email);
    } else {
      res.status(401).send();
    }

  }).then(function (userDetails) {


    let user = {
      user: {
        email: userDetails.email,
        name: userDetails.username,
        isEmailVerified: userDetails.isEmailVerified
      },
      accessToken: userDetails.accesstoken
    };
    res.status(200).send(user);
  }, function (err) {
    console.log("------error", err);
    winston.error("error in user login" + err);
    res.status(500).send(err);


  });

};




module.exports = {
  signUp,
  logIn
};