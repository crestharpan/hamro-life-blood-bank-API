const express = require('express');
const requestController = require('../Controllers/bloodRequestController');
const router = express.Router();

router.post('/create', requestController.request);
router.get('/get', requestController.getAll);
router
  .route('/:id')
  .patch(requestController.update)
  .delete(requestController.delete);

module.exports = router;
