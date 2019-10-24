const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
var mysql = require("mysql");
//fs = require("fs-extra");
app.use(bodyParser.urlencoded({ extended: true }));

//DataBase Connection
var con = mysql.createConnection({
  host: "db4free.net",
  user: "madhur",
  password: "madhur08",
  database: "madhurdb",
  port: 3306
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../assets/tmp/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
var upload = multer({ storage: storage });

//ROUTES WILL GO HERE
app.get("/", function(req, res) {
  res.json({ message: "WELCOME" });
});

//Get All Product
app.get("/products", (req, res, next) => {
  con.connect(function(error) {
    if (error) throw next(error);
    con.query("SELECT * FROM product", function(error, result, fields) {
      if (error) {
        error.httpStatusCode = 400;
        throw next(error);
      }
      res.send(result);
    });
  });
});

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.listen(3300, () => console.log("Server started on port 3300"));
