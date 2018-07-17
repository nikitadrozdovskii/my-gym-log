const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imageRoutes = require("./routes/imageRoutes");
const exesRoutes = require("./routes/exesRoutes");
const authRoutes = require("./routes/authRoutes");
const checkAuth = require("./middleware/checkAuth");
const Day = require("./models/day");

const app = express();

connected = true;

mongoose
  .connect(
    "mongodb+srv://nikita:sYgRzgawVF53xpSq@cluster0-psr13.mongodb.net/test?retryWrites=false"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
    connected = false;
    console.log(connected);
  });



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//provide images staticly 
app.use("/images", express.static(path.join("backend", "images")));

//set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

//this middleware allows requests with method header set to OPTIONS to pass without error,
//whereas all other requests are passed to next middleware
app.use((req, res, next) => {
  if (res.req.connection._httpMessage.req.method === "OPTIONS"){
    res.status(200).send();
  } else {
    next();
  }
});

//this middleware returns an error to client if server is not connected to DB
app.use((req, res, next) => {
    if (!connected){
      res.statusMessage = 'Database Error';
      res.status(500).send({ error: 'Server could not connect to database.' })
      } else {
        next();
      }
});


app.get("/api/analytics/:exeName", checkAuth, (req, res, next) => {
  console.log("Collecting data for " + req.params.exeName);
  // Day.find({user: req.userId}).then((results) => {
  //   console.log(results);
  // });
  res.status(200).json({
    dates: [], weights: []
  });
});

app.use("/api/image", checkAuth, imageRoutes);
app.use("/api/exes", checkAuth, exesRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
