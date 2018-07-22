const express = require("express");
const Day = require('../models/day');
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const mimeTypeMap = {
    'image/png' : 'png',
    'image/jpeg': 'jpg',
    'image/jpg' : 'jpg'
  }
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
      // console.log(file);
      const isValid = mimeTypeMap[file.mimetype];
      let error = new Error('Invalid MIME type');
  
      //making sure duplicates for the same date not stored if they have different extensions
      const jpg = `images/${file.originalname}-${req.userId}.jpg`;
      const png = `images/${file.originalname}-${req.userId}.png`;
  
      let isDuplicate = false;
      // Check if the file exists. If png is passed, and jpg exists, needs to delete jpg version and vice versa
      //(if extension is the same, file will be overwritten implicitly)
      fs.access(jpg, fs.constants.F_OK, (err) => {
        console.log(`${file} ${err ? 'Alternative file does not exist' : 'JPG version already exists'}`);
        if (!err) {
          if (mimeTypeMap[file.mimetype] === 'png'){
            console.log('passed png is duplicate of existing jpg');
            // delete existing jpg 
            fs.unlink(jpg, (err) => {
              if (err) throw err;
              console.log('duplicate jpg was deleted');
            });
          }
        }
      });
  
      fs.access(png, fs.constants.F_OK, (err) => {
        console.log(`${file} ${err ? ' Alternative file does not exist' : 'PNG version already exists'}`);
        if (!err) {
          if (mimeTypeMap[file.mimetype] === 'jpg'){
            console.log('passed jpg is duplicate of existing png');
            // delete existing png 
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
      cb(error, 'images');
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split(' ').join('-');
      const extension = mimeTypeMap[file.mimetype];
      cb(null, `${name}-${req.userId}.${extension}`);
    }
  });

//post picture for provided date and userId from token
router.post('/:date', multer({limits: {fileSize: 4000000, files:1}, storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const imagePath = url + "/images/" + req.file.filename; 
    //find the day, if it does not exist, create it, add this image to its imagePath property
    Day.find({date: req.params.date, user: req.userId}).then((days) => { //query for user as well
      if (days.length === 0) {
        console.log('no day found');
        const newDay = new Day({date: req.params.date, imagePath: imagePath, user: req.userId}); 
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
router.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(500).json(
        {message: 'File too big'}
      );
    }
    });
  
//delete picture for provided date and userId
router.delete("/:date", (req, res, next) => {
    Day.findOneAndUpdate({date: req.params.date, user: req.userId}, {imagePath:''}).then(() => {
      
      fs.unlink(`images/${req.params.date}-${req.userId}.png`, (err) => {
        if (!err){
          res.status(200).json({
            message: "Image successfully deleted from DB and server"
          });
        } else {
        console.log(err);

        }
      });
      fs.unlink(`images/${req.params.date}-${req.userId}.jpg`, (err) => {
        if (!err){
          res.status(200).json({
            message: "Image successfully deleted from DB and server"
          });
        } else {
        console.log(err);
        }
      });
  
    }).catch((error) => {
      res.status(200).json({
        message: 'Error deleting image from database'
      });
    });
  });
  
//return picture for provided date and userId
router.get("/:date", (req, res, next) => {
    //if day is created, return imagePath for it
    Day.find({date: req.params.date, user: req.userId}).then((days) => {
      res.status(200).json({
        imagePath: days[0].imagePath
      });
    }).catch((error) => {
      res.status(500).json({
        message: "Day is not found"
      })
    });
  });
  

module.exports = router;