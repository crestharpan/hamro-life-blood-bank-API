const express = require('express');
const bloodBankController = require('../Controllers/bloodBankController');
const router = express.Router();

router.post('/', bloodBankController.add);
router.get('/get', bloodBankController.getAll);
router
  .route('/:id')
  .get(bloodBankController.getOne)
  .patch(bloodBankController.update)
  .delete(bloodBankController.delete);
module.exports = router;
