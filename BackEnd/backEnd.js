let express = require("express");
let app = express();
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = "mongodb://localhost:27017/book-an-appoinment";
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let doctors = dbo
      .collection("doctorsDetail")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });
});

app.post("/addPatient", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let emp = dbo.collection("patients").insertOne(req.body, (err, res) => {
      if (err) throw err;
      else if (req.body == "") {
        console.log("Invalid data");
      } else console.log("Inserted Successfully");
    });
  });
});

app.get("/patients", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let doctors = dbo
      .collection("patients")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`connected to the server ${port}`));
