const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a Column name']
    },
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: [true, 'Column must belong to a Board']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

columnSchema.index({ board: 1 });

// Adding virtual field
columnSchema.virtual('cards', {
  ref: 'Card',
  foreignField: 'column',
  localField: '_id'
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
