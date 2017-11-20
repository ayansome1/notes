'use strict';
/* global require,module*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let winston = require('winston');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;

let getNotes = (req, res) => {

  let connection = mysql.createConnection(connInfo);
  let query = "select * from notes where userId = ? order by id desc;";

  connection.query(query,[req.user.userId], (err, results) => {
    if (err) {
      winston.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
  connection.end();

};

let saveNewNote = (req,res) => {

  let data = req.body.data;
  let params = [];
  params.push(data);
  let connection = mysql.createConnection(connInfo);
  let query = "insert into notes set ?,lastEdit=NOW(),userId = ?;";
  params.push(req.user.userId);

  connection.query(query,params, (err, results) => {
    if (err) {
      winston.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
  connection.end();

};

let editNote = (req,res) => {

  let data = req.body.data;
  delete data.lastEdit;
  let params = [];
  params.push(data);
  params.push(data.id);

  let connection = mysql.createConnection(connInfo);
  let query = "update notes set ?,lastEdit = NOW() where id = ?;";

  connection.query(query,params, (err, results) => {
    if (err) {
      winston.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
  connection.end();

};

let deleteNote = (req,res) => {

  let id = req.params.id;

  let connection = mysql.createConnection(connInfo);
  let query = "delete from notes where id = ?;";

  connection.query(query,[id], (err) => {
    if (err) {
      winston.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
  connection.end();

};

module.exports = {
  getNotes,
  saveNewNote,
  editNote,
  deleteNote
};