/* eslint-disable node/no-unsupported-features/es-syntax */
const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const addSubTask = catchAsync(async (request, response, next) => {
  const document = await Card.findOneAndUpdate(
    {
      _id: request.params.cardId
    },
    {
      $push: {
        subTasks: { name: request.body.name }
      }
    },
    {
      new: true
    }
  );
  if (!document) next(new AppError('can not find the document', 404));

  response.status(201).json({
    status: 'Success',
    data: document
  });
});

const getSubTask = catchAsync(async (request, response, next) => {
  let document = await Card.findById({ _id: request.params.cardId });
  document = document.subTasks.id(request.params.subtaskId);

  if (!document)
    return next(new AppError('No document found with this id.', 404));

  response.status(200).json({
    status: 'success',
    data: {
      document
    }
  });
});

const deleteSubTask = catchAsync(async (request, response, next) => {
  const document = await Card.findOneAndUpdate(
    {
      _id: request.params.cardId
    },
    {
      $pull: {
        subTasks: { _id: request.params.subtaskId }
      }
    }
  );
  if (!document) next(new AppError('can not find subtask to delete', 404));

  response.status(204).json({
    status: 'Success',
    data: null
  });
});

const updateSubTask = catchAsync(async (request, response, next) => {
  const document = await Card.findOneAndUpdate(
    {
      _id: request.params.cardId,
      'subTasks._id': request.params.subtaskId
    },
    {
      'subTasks.$': request.body
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!document) return next(new AppError('can not find the document', 404));
  response.status(200).json({
    status: 'Success',
    data: document
  });
});

const setColumnId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.column) req.body.column = req.params.columnId;
  next();
};

const createCard = factory.createOne(Card);
const getAllCards = factory.getAll(Card);
const deleteCard = factory.deleteOne(Card);
const getCard = factory.getOne(Card);
const updateCard = factory.updateOne(Card);
const deleteAllCards = catchAsync(async (request, response, next) => {
  if (!request.params.columnId)
    return next(new AppError('please provide column id.', 400));
  await Card.deleteMany({ column: request.params.columnId });
  response.status(204).json({
    status: 'success',
    data: null
  });
});
module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  getCard,
  updateCard,
  addSubTask,
  getSubTask,
  deleteSubTask,
  updateSubTask,
  setColumnId,
  deleteAllCards
};
