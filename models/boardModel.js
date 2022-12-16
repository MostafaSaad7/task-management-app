const mongoose = require('mongoose');
const Column = require('./columnModel');
const Card = require('./cardModel');

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a Board name'],
      trim: true
    },
    description: {
      type: String,
      minlength: 15,
      maxlength: 100
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Adding virtual field
boardSchema.virtual('columns', {
  ref: 'Column',
  foreignField: 'board',
  localField: '_id'
});

// boardSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'columns'
//   });
//   next();
// });

boardSchema.post(/^delete/, async function() {
  await Column.deleteMany({ board: this._conditions._id });
  await Card.deleteMany({ board: this._conditions._id });
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
