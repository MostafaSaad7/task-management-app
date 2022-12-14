const express = require('express');
const boardController = require('../controllers/boardController');
const { route } = require('./columnRoutes');
const columnRouter = require('./columnRoutes');

const router = express.Router();

router.use('/:boardId/columns', columnRouter);

router
  .route('/')
  .get(boardController.getAllBoards)
  .post(boardController.createBoard);

router
  .route('/:id')
  .get(boardController.getBoard)
  .patch(boardController.updateBoard)
  .delete(boardController.deleteBoard);

module.exports = router;
