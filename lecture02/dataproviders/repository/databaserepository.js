const mysql = require('mysql');

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
