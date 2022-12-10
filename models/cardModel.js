const mongoose = require('mongoose');

const subTaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid subtask name']
  },
  done: {
    type: Boolean,
    default: false
  }
});

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a Card name']
  },
  description: {
    type: String,
    minlength: 15,
    maxlength: 100
  },
  subTasks: [subTaskSchema],
  startDate: {
    type: Date,
    default: Date.now(),
    min: Date.now(),
    max: Date.now('2100')
  },
  dueDate: {
    type: Date,
    min: Date.now(),
    max: Date.UTC('2030'),
    validate: {
      validator: function() {
        return this.dueDate >= this.startDate;
      },
      message: 'due date can not be lower than start date  '
    }
  }
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
