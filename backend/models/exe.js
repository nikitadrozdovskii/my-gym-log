const mongoose = require('mongoose');

const exeSchema = mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: [] , required: true }
});

module.exports = mongoose.model('Exe', exeSchema);
