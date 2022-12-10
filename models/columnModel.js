const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a Column name']
    },
    cards: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Card'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

columnSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'cards'
  });
  next();
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
