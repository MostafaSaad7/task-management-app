const Column = require('../models/columnModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const cardController = require('./cardController');

const getAllColumn = factory.getAll(Column);
const getColumn = factory.getOne(Column, { path: 'cards' });
const createColumn = factory.createOne(Column);
const updateColumn = factory.updateOne(Column);

const deleteColumn = catchAsync(async (request, response, next) => {
  const document = await Column.findByIdAndDelete(request.params.id);
  if (!document)
    return next(new AppError('No document found with this id.', 404));
  request.params.columnId = request.params.id;
  cardController.deleteAllCards(request, response, next);
});

module.exports = {
  getAllColumn,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn
};
