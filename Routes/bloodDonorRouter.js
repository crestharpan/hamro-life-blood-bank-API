const express = require('express');
const bloodDonorController = require('../Controllers/bloodDonorController');
const router = express.Router();

router.post('/', bloodDonorController.add);
module.exports = router;
