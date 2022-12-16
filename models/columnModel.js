const mongoose = require('mongoose');
const Card = require('./cardModel');

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

columnSchema.post('remove', async function() {
  await Card.deleteMany({ column: this._conditions._id });
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
