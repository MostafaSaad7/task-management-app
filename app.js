const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('common'));

app.get('/hello', (req, res, next) => {
  res.status(200).json({
    status: 'Success '
  });
});

module.exports = app;
