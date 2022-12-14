const express = require('express');
const columnController = require('../controllers/columnController');
const cardRouter = require('../routes/cardRoutes');

const router = express.Router();
router.use('/:columnId/cards', cardRouter);

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
