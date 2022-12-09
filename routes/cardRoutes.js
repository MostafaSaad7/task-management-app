const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.route('/').post(cardController.createCard);

module.exports = router;
