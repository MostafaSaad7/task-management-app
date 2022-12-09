const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router
  .route('/')
  .post(cardController.createCard)
  .get(cardController.getAllCards);

module.exports = router;
