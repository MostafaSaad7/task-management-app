/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/); //regex to match text between quotes
  const message = `Duplicate field value ${value} please use another value `;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired please login again. ', 401);

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
  // eslint-disable-next-line node/no-unsupported-features/es-builtins
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid imput data ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const sendErrorProd = (err, response) => {
  if (err.isOperational) {
    response
      .status(err.status)
      .json({ status: err.status, message: err.message });
  } else {
    console.error('Error 💥 ', err);
    response.status(500).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
};

const sendErrorDev = (err, response) => {
  response.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
module.exports = (err, request, response, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, response);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, response);
  }
};
