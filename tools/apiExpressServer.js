var express = require("express");
var app = express();
var pool = require("./dbConnect");
var bodyParser = require("body-parser");
const multer = require("multer");
var cors = require("cors");
app.use(cors());

//start body-parser configuration
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
//end body-parser configuration

app.get("/", function(req, res) {
  res.send("Express Server is running....");
});

//rest api to get a All product data
app.get("/product/all", function(req, res) {
  pool.query("SELECT * FROM product", function(err, results, fields) {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

//rest api to delete a single product data
app.delete("/product", function(req, res) {
  //console.log(String(req.params.id));
  pool.query("DELETE FROM product WHERE id=?", [String(req.body.id)], function(
    err,
    results,
    fields
  ) {
    if (err) throw err;
    //console.log("Deleted Row(s):", results.affectedRows);
    res.send(JSON.stringify(results));
  });
});

//rest api to get a single product data
app.get("/product/:id", function(req, res) {
  pool.query("select * from product WHERE id=?", [req.params.id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//rest api to create a new product into mysql database
app.post("/product", function(req, res) {
  var postData = req.body;
  pool.query("INSERT INTO product SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

//rest api to update record into mysql database
app.put("/product", function(req, res) {
  var postData = req.body;
  pool.query(
    "UPDATE product SET name=?,unit=?,price=?,image=?,description=?,slug=?,quantity=? WHERE id=?",
    [
      postData.name,
      postData.unit,
      postData.price,
      postData.image,
      postData.description,
      postData.slug,
      postData.quantity,
      postData.id
    ],
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
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

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.listen(3300, () => console.log("Express Server started on port 3300"));
