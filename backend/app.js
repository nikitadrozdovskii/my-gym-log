const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
    // console.log(`Request method is OPTIONS`);
    res.status(200).send();
  } else {
    next();
  }
});

//this middleware returns an error to client if server is not connected to DB
app.use((req, res, next) => {
  //console.log(req.connection._httpMessage.req.method); //this is method header
  // (res.req.connection._httpMessage.req.method === "OPTIONS")
    if (!connected){
      res.statusMessage = 'Database Error';
      res.status(500).send({ error: 'Server could not connect to database.' })
      } else {
        next();
      }
  


});

app.post("/api/exes/:date", (req, res, next) => {
    //find the day, if it does not exist, create it, add this Exe to it's exes array
    Day.find({date: req.params.date}).then((day)=>{
      if (day.length === 0) {
        console.log('no day found');
        const newDay = new Day({date: req.params.date, exes: [{name: req.body.name, sets: req.body.sets}]});
        newDay.save();
      } else {
        console.log(day[0]);
        day[0].exes.push({name: req.body.name, sets: req.body.sets});
        day[0].save();
      }
    }).catch((error)=>
  {console.log(error);}
);

    //add exe to "exes" collection, TBD: once "days" collection is fully implemented, remove
    // const exe = new Exe({
    //   name: req.body.name,
    //   sets: req.body.sets
    // });
    // exe.save().then((createdExe) => {
    //   res.status(201).json({
    //     exe: createdExe,
    //     message: "Exe added to DB!"
    //   })
    // });
    // // console.log(req.body);
});

app.get("/api/days/:date", (req, res, next) => {
  Day.find({date: req.params.date}).then(
    (day) => {
      res.status(200).json({
        message: "Exes fetched.",
        exes: day[0].exes
      });
    }
  ).catch((error) => {
      console.log("error" + error);
});
});

app.delete("/api/exes/:id", (req, res, next) => {
  Exe.deleteOne({_id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Server successfully deleted exe."
    });
  }
  )
  .catch((error) => {
    console.log(error);
  });
});

app.put("/api/exes/:id", (req, res, next) => {
  Exe.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.status(200).json({
      message: "Successfully updated exe."
    })
  })
  .catch( () => {
    console.log(`id: ` + req.params._id);
  }
  );
});

module.exports = app;
