const express = require('express');
const userController = require('../controllers/userController');
const autController = require('../controllers/authController');
const boardRouter = require('./boardRoutes');

const router = express.Router();
router.use('/:userId/boards', boardRouter);

router.post('/signup', autController.signup);
router.post('/login', autController.login);
router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
module.exports = router;
