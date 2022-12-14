/* eslint-disable node/no-unsupported-features/es-syntax */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeature = require('../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndDelete(request.params.id);

    if (!doc) return next(new AppError('No document found with this id.', 404));

    response.status(204).json({
      status: 'Success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (request, response, next) => {
    const document = await Model.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!document)
      return next(new AppError('No document found with this id.', 404));

    response.status(200).json({
      status: 'Success',
      data: {
        document
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (request, response, next) => {
    let query = Model.findById(request.params.id);
    if (popOptions) query = query.populate(popOptions);
    const document = await query;
    if (!document)
      return next(new AppError('No document found with this id.', 404));
    response.status(200).json({
      status: 'success',
      data: {
        document
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (request, response, next) => {
    const document = await Model.create(request.body);
    if (!document) return next(new AppError("can't create document.", 404));
    response.status(201).json({
      status: 'success',
      data: {
        data: document
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (request, response, next) => {
    let filter = {};
    if (request.params.columnId) filter = { column: request.params.columnId };
    const features = new APIFeature(Model.find(filter), request.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.dbQuery;
    response.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
