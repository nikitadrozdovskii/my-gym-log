const mongoose = require('mongoose');

const exeSchema = mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: [] , required: true }
  });

const daySchema = mongoose.Schema({
  date: { type: String, required: true },
  exes: [exeSchema],
  imagePath: { type: String }
});

module.exports = mongoose.model('Day', daySchema);