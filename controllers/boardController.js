const Board = require('../models/boardModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createBoard = factory.createOne(Board);
const getAllBoards = factory.getAll(Board);
const getBoard = factory.getOne(Board, { path: 'columns' });

// restrict to owners
const updateBoard = factory.updateOne(Board);
const deleteBoard = catchAsync(async (request, response, next) => {
  const document = await Board.deleteOne({ _id: request.params.id });
  if (!document.deletedCount)
    return next(new AppError('No document found with this id.', 404));
  response.status(204).json({
    status: 'success',
    data: null
  });
});

const setOwnersMembersId = (request, response, next) => {
  // Allow nested routes
  if (!request.body.owners) request.body.owners = [request.params.userId];
  if (!request.body.members) request.body.members = [request.params.userId];
  next();
};
module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  setOwnersMembersId
};
