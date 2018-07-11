const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const Exe = require('./models/exe');
const Day = require('./models/day');


const mimeTypeMap = {
  'image/png' : 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    console.log(file);
    const isValid = mimeTypeMap[file.mimetype];
    let error = new Error('Invalid MIME type');

    //making sure duplicates for the same date not stored if they have different extensions
    const jpg = "backend/images/" + file.originalname + ".jpg";
    const png = "backend/images/" + file.originalname + ".png";

    let isDuplicate = false;
    // Check if the file exists. If png is passed, and jpg exists, needs to delete jpg version and vice versa
    fs.access(jpg, fs.constants.F_OK, (err) => {
      console.log(`${file} ${err ? 'does not exist' : 'JPG version already exists'}`);
      if (!err) {
        if (mimeTypeMap[file.mimetype] === 'png'){
          console.log('passed png is duplicate of existing jpg');
          //TBD: delete existing jpg 
          fs.unlink(jpg, (err) => {
            if (err) throw err;
            console.log('duplicate jpg was deleted');
          });
        }
      }
    });

    fs.access(png, fs.constants.F_OK, (err) => {
      console.log(`${file} ${err ? 'does not exist' : 'PNG version already exists'}`);
      if (!err) {
        if (mimeTypeMap[file.mimetype] === 'jpg'){
          console.log('passed jpg is duplicate of existing png');
          //TBD: delete existing png 
          fs.unlink(png, (err) => {
            if (err) throw err;
            console.log('duplicate png was deleted');
          });
        }
      }
    });

    if (isValid && !isDuplicate) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('-');
    const extension = mimeTypeMap[file.mimetype];
    cb(null, name + '.' + extension);
  }
});

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
app.use("/images", express.static(path.join("backend/images")));

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

app.post('/api/days/:date/image', multer({limits: {fileSize: 4000000, files:1}, storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const imagePath = url + "/images/" + req.file.filename;
  //find the day, if it does not exist, create it, add this image to its imagePath property
  Day.find({date: req.params.date}).then((days) => {
    if (days.length === 0) {
      console.log('no day found');
      const newDay = new Day({date: req.params.date, imagePath: imagePath});
      newDay.save().then(() => {
        res.status(200).json({
          message: "Day created and imagePath added to it in DB",
          imagePath: imagePath
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      //if day exists,add ImagePath to it
      console.log(imagePath);
      days[0].imagePath = imagePath;
      days[0].save();
    }
  })
  res.status(200).json({
    message: "Image uploaded to server",
    imagePath: imagePath
  });
});

//catch file size error and return it to client
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(500).json(
      {message: 'File too big'}
    );
  }
  });

app.get("/api/days/:date/image", (req, res, next) => {
  //if day is created, return imagePath for it
  Day.find({date: req.params.date}).then((days) => {
    res.status(200).json({
      imagePath: days[0].imagePath
    });
  }).catch((error) => {
    res.status(200).json({
      message: "Day is not found"
    })
  });
});

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

app.get("/api/days/", (req, res, next) => {
  res.status(200).json({
    message: "Day not found",
    exes: []
  });
});

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


  // Exe.deleteOne({_id: req.params.id }).then(() => {
  //   res.status(200).json({
  //     message: "Server successfully deleted exe."
  //   });
  // }
  // )
  // .catch((error) => {
  //   console.log(error);
  // });
});

app.put("/api/days/:date/:id", (req, res, next) => {
  // Exe.findByIdAndUpdate(req.params.id, req.body).then(() => {
  //   res.status(200).json({
  //     message: "Successfully updated exe."
  //   })
  // })
  // .catch( () => {
  //   console.log(`id: ` + req.params._id);
  // }
  // );
  Day.find({date: req.params.date}).then((days) => {
    console.log(days[0].exes.id(req.params.id));
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

module.exports = app;
