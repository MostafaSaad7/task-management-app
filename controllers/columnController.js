const Column = require('../models/columnModel');
const factory = require('./handlerFactory');

const getAllColumn = factory.getAll(Column);
const getColumn = factory.getOne(Column, { path: 'cards' });
const createColumn = factory.createOne(Column);
const updateColumn = factory.updateOne(Column);
const deleteColumn = factory.deleteOne(Column);

module.exports = {
  getAllColumn,
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn
};
