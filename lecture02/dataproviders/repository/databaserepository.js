const mysql = require('mysql');
const async = require('async');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'rs-admin',
  password: 'rs-admin-secret-password',
  database: 'rs-db'
});

exports.query = function (query, params, callback) {
  pool.query(query, params, (error, data) => {
    callback(error, data);
  });
};
/* eslint-disable */

exports.performTransaction = function (functions, callback) {
  pool.getConnection(function (error, connection) {
    connection.beginTransaction(function (error) {
      if (error) {
        connection.release();
        callback(error);
        return;
      }

      functions = functions.map(function(func) {
        return func.bind(null, connection);
      });

      async.series(functions, function (error, results) {
        if (error) {
          connection.rollback(function () {
            connection.release();
            callback(error);
          });
        } else {
          connection.commit(function (error) {
            if (error) {
              connection.rollback(function () {
                connection.release();
                callback(error);
              });
            } else {
              connection.release();
              callback(null, results);
            }
          });
        }
      });
    });
  });
};
