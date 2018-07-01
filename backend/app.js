const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Exe = require('./models/exe');
const app = express();

mongoose
  .connect(
    "mongodb+srv://nikita:sYgRzgawVF53xpSq@cluster0-psr13.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/exes", (req, res, next) => {
    const exe = new Exe({
      name: req.body.name,
      sets: req.body.sets
    });
    exe.save().then((createdExe) => {
      res.status(201).json({
        exe: createdExe,
        message: "Exe added to DB!"
      })
    });
    // console.log(req.body);
});

module.exports = app;
