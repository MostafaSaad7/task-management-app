/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const createUser = catchAsync(async (request, response, next) => {
  const newUSer = await User.create(request.body);
  if (!newUSer) {
    return response.status(500).json({
      status: 'error',
      message: 'This route is not defined please use /signup instead'
    });
  }
  response.status(200).json({
    status: 'Success',
    newUSer
  });
});
const getAllUsers = factory.getAll(User);
const updateUser = factory.updateOne(User);
const deleteUser = factory.deleteOne(User);
const getUser = factory.getOne(User, { path: 'boards' });

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
