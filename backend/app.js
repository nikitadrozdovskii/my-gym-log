const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imageRoutes = require("./routes/imageRoutes");

const Exe = require('./models/exe');
const Day = require('./models/day');




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
    "Origin, X-Requested-With, Content-Type, Accept"
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

//add an exe to a given day
app.post("/api/exes/:date", (req, res, next) => {
    //find the day, if it does not exist, create it, add this Exe to it's exes array
    Day.find({date: req.params.date}).then((day)=>{
      if (day.length === 0) {
        console.log('no day found');
        const newDay = new Day({date: req.params.date, exes: [{name: req.body.name, sets: req.body.sets}]});
        newDay.save().then((createdExe) => {
          res.status(200).json({
            exe: createdExe,
            message: "Exe added to DB!"
          });
        }).catch((error) => {
          console.log(error);
        });
      } else {
        // console.log(day[0]);
        day[0].exes.push({name: req.body.name, sets: req.body.sets});
        day[0].save().then((createdExe) => {
          res.status(200).json({
            exe: createdExe,
            message: "Exe added to DB!"
          });
        }).catch((error) => {
          console.log(error);
        });;
      }
    }).catch((error)=>
  {console.log(error);}
);
});

//handling the case of request with null for day parameter
app.get("/api/days/", (req, res, next) => {
  res.status(200).json({
    message: "Day not found",
    exes: []
  });
});

//get exes for a given day
app.get("/api/days/:date", (req, res, next) => {
  Day.find({date: req.params.date}).then(
    (days) => {
      res.status(200).json({
        message: "Exes fetched.",
        exes: days[0].exes
      });
    }
  ).catch((error) => {
    res.status(200).json({
      message: "Day not found",
      exes: []
    });
});
});

//delete exe from day
app.delete("/api/exes/:date/:id", (req, res, next) => {
  //find day, delete matching id exe
  Day.find({date: req.params.date}).then(
    (days) => {
      days[0].exes.remove(req.params.id);
      days[0].save().then(() => {
        res.status(200).json({
          message: "Server successfully deleted exe"
        }
        );}
      ).catch((error) => {
        console.log(error);
      });
    }
  ).catch((error) => {
    console.log(error);
});
});

//update an exe
app.put("/api/days/:date/:id", (req, res, next) => {
  Day.find({date: req.params.date}).then((days) => {
    // console.log(days[0].exes.id(req.params.id));
    days[0].exes.id(req.params.id).set({name: req.body.name, sets: req.body.sets});
    days[0].save().then(() => {
      res.status(200).json({
        message: "Server successfully updated exe"
      }
      );}
    ).catch((error) => {
      console.log(error);
    });
  });
});

app.use(imageRoutes);

module.exports = app;
