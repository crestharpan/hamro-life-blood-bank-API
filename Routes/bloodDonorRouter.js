const express = require('express');
const bloodDonorController = require('../Controllers/bloodDonorController');
const router = express.Router();

router.post('/', bloodDonorController.add);
router.get('/create', bloodDonorController.getAll);
router
  .route('/:id')
  .get(bloodDonorController.getOne)
  .patch(bloodDonorController.update)
  .delete(bloodDonorController.delete);
module.exports = router;
