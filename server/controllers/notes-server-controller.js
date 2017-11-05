'use strict';
/* global require,module*/
let q = require('q');
let config = require('../config/config.js');
let mysql = require('mysql');
let connInfo = config.sqlconn;
connInfo.multipleStatements = true;


let getNotes = (req, res) => {

  let connection = mysql.createConnection(connInfo);
  let query = "select * from notes;";

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
  connection.end();
};

let saveNotes = (req,res) => {

  let data = req.body.data;
  let params = [];
  params.push(data);
  params.push(data.id);

  let connection = mysql.createConnection(connInfo);
  let query = "update notes set ? where id = ?;";


  connection.query(query,params, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
  connection.end();

};

module.exports = {
  getNotes,
  saveNotes
};