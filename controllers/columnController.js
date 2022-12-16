const Column = require('../models/columnModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const setBoardId = (request, response, next) => {
  // Allow nested routes
  if (!request.body.board) request.body.board = request.params.boardId;
  next();
};

const getAllColumn = factory.getAll(Column);
const getColumn = factory.getOne(Column, { path: 'cards' });
const createColumn = factory.createOne(Column);
const updateColumn = factory.updateOne(Column);

const deleteColumn = catchAsync(async (request, response, next) => {
  const document = await Column.deleteOne({ _id: request.params.id });
  if (!document.deletedCount)
    return next(new AppError('No document found with this id.', 404));
  response.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  getAllColumn,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
  setBoardId
};
