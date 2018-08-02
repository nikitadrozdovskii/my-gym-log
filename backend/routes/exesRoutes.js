const express = require("express");
const Day = require('../models/day');

const router = express.Router();


//add an exe to a given day
router.post("/:date", (req, res, next) => {
    //find the day with matching userId, if it does not exist, create it, add this Exe to it's exes array
    Day.find({date: req.params.date, user: req.userId}).then((day)=>{ //query for user as well
      if (day.length === 0) {
        console.log('no day found');
        const newDay = new Day({date: req.params.date, exes: [{name: req.body.name, sets: req.body.sets}], user: req.userId}); //add userId as well
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
        day[0].exes.push({name: req.body.name.toLowerCase(), sets: req.body.sets});
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
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Day not found",
    exes: []
  });
});

//get exes for a given day
router.get("/:date", (req, res, next) => {
  Day.find({date: req.params.date, user: req.userId}).then( //query for user as well
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
router.delete("/:date/:id", (req, res, next) => {
  //find day, delete matching id exe
  Day.find({date: req.params.date, user: req.userId}).then( //query for user as well
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
router.put("/:date/:id", (req, res, next) => {
  Day.find({date: req.params.date, user: req.userId}).then((days) => { //query for user as well
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

module.exports = router;