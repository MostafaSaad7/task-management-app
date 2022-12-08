const mongoose = require('mongoose');
const validator = require('validator');

const columnSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a Board name']
  }
});

const Column = mongoose.model('Board', columnSchema);
module.exports = Column;
