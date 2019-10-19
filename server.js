const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const app = express();
const port = 3000;
const DB_URL =
  "mongodb+srv://59161146:02539d07c7@cluster0-fbqsx.gcp.mongodb.net/admin?retryWrites=true&w=majority";
const DB_NAME = "example";

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello Mongo" });
});

app.get("/people", (req, res) => {
  collection.find({}).toArray((err, result) => {
    if (err) {
      return res.status(500).send({ error: err });
    }

    res.send(result)
  });
});

app.post("/people", (req, res) => {
  var person = req.body;
  collection.insert(person, (err, result) => {
    if (err) {
      return res.status(500).send({ error: err });
    }

    res.send(result.result);
  });
});

var collection, database;
app.listen(port, () => {
  MongoClient.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        throw err;
      }

      database = client.db(DB_NAME);
      collection = database.collection("people");
      console.log(`Connecting to ${DB_NAME} successfully`);
      console.log(`Try-Mongo Started at port:${port}`);
    }
  );
});
