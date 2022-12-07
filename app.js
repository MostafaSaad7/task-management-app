const express = require('express');

const app = express();

app.get('/hello', (req, res, next) => {
  res.status(200).json({
    status: 'Success '
  });
});

module.exports = app;
