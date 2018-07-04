const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Exe = require('./models/exe');
const app = express();

connected = true;

mongoose
  .connect(
    "!mongodb+srv://nikita:sYgRzgawVF53xpSq@cluster0-psr13.mongodb.net/test?retryWrites=false"
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

//TBD if request is OPTIONS, reply with 200, otherwise do what you do below. Otherwise you keep getting your custom error to OPTIONS , and when
//your actual request goes out the Angular ends up getting Code 0 and unknown type
app.use((req, res, next) => {
  if (!connected){
  res.statusMessage = 'My Custom Error';
  res.status(500).send({ error: 'Something failed!' })
  } else {
    next();
  }

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

app.get("/api/exes", (req, res, next) => {
  Exe.find().then(
    (exes) => {
      res.status(200).json({
        message: "Exes fetched.",
        exes: exes
      });
    }
  ).catch((error) => {
      console.log(error);
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
