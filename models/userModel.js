const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email ']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this always works on save and create
      validator: function() {
        return this.password === this.passwordConfirm;
      },
      message: 'Passwords are not the same'
    }
  },
  boards: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Board'
    }
  ],
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
