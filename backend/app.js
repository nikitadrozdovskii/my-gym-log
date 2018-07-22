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
    `mongodb+srv://nikita:${process.env.MONGO_PASSWORD}@cluster0-psr13.mongodb.net/test?retryWrites=false`
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
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));


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
  // console.log("Collecting data for " + req.params.exeName);
  //get all days for this user
  Day.find({user: req.userId})
  .then((results) => {
    //map resuts to get rid of user Id and date Id
    const filteredForName = results.map((day) => {
      const tempDay = JSON.parse(JSON.stringify(day));
      const outDay = {};
      // filter tempDay exes to get only the ones that match requested exe name
      tempExes = tempDay.exes.filter((exe) => {
        if(exe.name === req.params.exeName) {
          return true;
        }
      }); 
      // console.log(tempExes);
      tempDay.exes = tempExes;
      outDay[tempDay.date] = tempDay.exes;
      return outDay;
    });
    //remove dates with no exercise found
    const filteredNonEmpty = filteredForName.filter((day) => {
      if (Object.values(day)[0].length > 0) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(filteredNonEmpty);
    res.status(200).json({
      results: filteredNonEmpty
    });
  });
});

app.use("/api/image", checkAuth, imageRoutes);
app.use("/api/exes", checkAuth, exesRoutes);
app.use("/api/auth", authRoutes);

//handle any errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})

module.exports = app;
