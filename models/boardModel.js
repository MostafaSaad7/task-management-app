const mongoose = require('mongoose');
const validator = require('validator');

const boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a Board name']
  },
  description: {
    type: String,
    minlength: 15,
    maxlength: 100
  }
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
