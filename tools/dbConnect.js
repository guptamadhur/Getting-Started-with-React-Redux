var mysql = require("mysql");
const connect = require("./dbCredentials");

var connection = mysql.createPool({
  connectionLimit: 100,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: connect.host,
  user: connect.user,
  password: connect.password,
  database: connect.database,
  port: connect.port
});

connection.getConnection(function(err, connection) {
  if (err) {
    if (connection) connection.release();
    throw err;
  }
});

connection.on("acquire", function(connection) {
  console.log("Connection %d acquired", connection.threadId);
});

connection.on("connection", function(connection) {
  connection.query("SET SESSION auto_increment_increment=1");
});

connection.on("release", function(connection) {
  console.log("Connection %d released", connection.threadId);
});

connection.on("enqueue", function() {
  console.log("Waiting for available connection slot");
});

connection.on("enqueue", function(error) {
  connection.release();
  console.log("Error have occurred " + error.sqlMessage);
});

module.exports = connection;
