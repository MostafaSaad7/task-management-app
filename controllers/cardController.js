const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const createCard = factory.createOne(Card);
const getAllCards = factory.getAll(Card);
const deleteCard = factory.deleteOne(Card);
module.exports = { createCard, getAllCards, deleteCard };
