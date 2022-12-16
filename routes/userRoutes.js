const express = require('express');
const userController = require('../controllers/userController');
const boardRouter = require('./boardRoutes');

const router = express.Router();
router.use('/:userId/boards', boardRouter);

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
