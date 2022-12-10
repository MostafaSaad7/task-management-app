const express = require('express');
const columnController = require('../controllers/columnController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(columnController.getAllColumn)
  .post(columnController.createColumn);

router
  .route('/:id')
  .patch(columnController.updateColumn)
  .delete(columnController.deleteColumn)
  .get(columnController.getColumn);

module.exports = router;
