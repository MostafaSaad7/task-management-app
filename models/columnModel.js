const mongoose = require('mongoose');

const columnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a Column name']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Adding virtual field
columnSchema.virtual('cards', {
  ref: 'Card',
  foreignField: 'column',
  localField: '_id'
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
