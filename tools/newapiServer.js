var express = require("express");
var http = require("http");
var mysql = require("mysql"),
  myConnection = require("express-myconnection");

var app = express();

// all environments
app.set("port", process.env.PORT || 3400);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.logger("dev"));

// It has to be registered somewhere before app.router
app.use(
  myConnection(
    mysql,
    {
      host: "db4free.net",
      user: "madhur",
      password: "madhur08",
      database: "madhurdb",
      port: 3306
    },
    "single"
  )
);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});

exports.index = function(req, res, next) {
  req.getConnection(function(err, connection) {
    connection.query("SELECT * FROM product", ["Hello World!"], function(
      err,
      results
    ) {
      if (err) return next(err);

      res.render("index", {
        title: "express-myconnection",
        result: results[0]
      });
    });
  });
};
