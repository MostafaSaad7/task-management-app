const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a Board name'],
    trim: true
  },
  description: {
    type: String,
    minlength: 15,
    maxlength: 100
  },
  columns: [{ type: mongoose.Schema.ObjectId, ref: 'Column' }]
});

boardSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'columns'
  });
  next();
});

// Adding virtual field
boardSchema.virtual('columns', {
  ref: 'Column',
  foreignField: 'board',
  localField: '_id'
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
