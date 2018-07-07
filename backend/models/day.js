const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  date: { type: string, required: true },
  exes: { type: []}
});

module.exports = mongoose.model('Day', daySchema);