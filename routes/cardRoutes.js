const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(cardController.createCard)
  .get(cardController.getAllCards);

router
  .route('/:id')
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard)
  .get(cardController.getCard);

router.route('/:cardId/subtasks').post(cardController.addSubTask);

router
  .route('/:cardId/subtasks/:subtaskId')
  .get(cardController.getSubTask)
  .delete(cardController.deleteSubTask)
  .patch(cardController.updateSubTask);
module.exports = router;
