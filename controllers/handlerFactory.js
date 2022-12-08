/* eslint-disable node/no-unsupported-features/es-syntax */
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeature = require('../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (request, response, next) => {
    const document = await Model.findOneAndDelete(request.params.id, null);

    if (!document) next(AppError('No document found with this id.', 404));

    response.status(204).json({
      status: 'Success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (request, response, next) => {
    const document = await Model.findOneAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!document) next(AppError('No document found with this id.', 404));

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
    const doc = await query;
    if (!doc) return next(new AppError('No document found with this id.', 404));
    response.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (request, response, next) => {
    const Document = await Model.create(request.body);
    if (!Document) return next(AppError("can't create Document.", 404));
    response.status(201).json({
      status: 'success',
      data: {
        data: Document
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (request, response, next) => {
    const features = new APIFeature(Model.find(), request.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    response.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
