const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cardRoutes');
const columnRouter = require('./routes/columnRoutes');
const boardRouter = require('./routes/boardRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.enable('trust proxy');
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/columns', columnRouter);
app.use('/api/v1/boards', boardRouter);
app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server `, 404)); // go to error handler by default even if it was any middleware after it
});

app.use(cookieParser());

app.use(globalErrorHandler);
module.exports = app;
