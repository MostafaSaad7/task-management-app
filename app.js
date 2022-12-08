const express = require('express');

const app = express();
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRouter);
app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server `, 404)); // go to error handler by default even if it was any middleware after it
});
app.use(globalErrorHandler);
module.exports = app;
